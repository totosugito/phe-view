import pandas as pd

from lib.LibUtils import LibUtils
from itertools import groupby
from operator import itemgetter


class LibWellProduction:
    # excelFileName = "./data/Demo.xlsx"
    excelFileName = "./data/Daily_Production_Volume_By_WELLS_Jan-Dec2024_Cleaned-MINI.xlsx"
    # excelFileName = "./data/Daily_Production_Volume_By_WELLS_Jan-Dec2024_Cleaned.xlsx"

    data = {
        "data": [],
        "region": {},
        "platform": {
            "list": [],
            "summary": {}
        },
        "well": {
            "list": [],
            "summary": {}
        },
    }

    KEY_PLATFORM = "platform_name"
    KEY_REGION = "region"
    KEY_WELL_NAME = "well_name"
    KEY_ACTUAL_OIL = "actual_oil_(bbl)_"
    KEY_ACTUAL_WATER = "actual_water_(bbl)_"
    KEY_ACTUAL_GAS = "actual_gas_(mcf)_"
    KEY_POTENTIAL_OIL = "potential_oil_(bbl)_"
    KEY_POTENTIAL_WATER = "potential_water_(bbl)_"
    KEY_POTENTIAL_GAS = "potential_gas_(mcf)_"

    KEY_ACTUAL_OIL_ = "actual_oil"
    KEY_ACTUAL_WATER_ = "actual_water"
    KEY_ACTUAL_GAS_ = "actual_gas"
    KEY_POTENTIAL_OIL_ = "potential_oil"
    KEY_POTENTIAL_WATER_ = "potential_water"
    KEY_POTENTIAL_GAS_ = "potential_gas"

    def create_well_summary(self, df, group_by=None, key_region=None, key_platform=None):
        grouped = df.groupby(group_by)

        data_summary = {}
        data_list = []
        for group_key, group in grouped:
            region = group[key_region].iloc[0]
            platform = group[key_platform].iloc[0]
            idx_start = group.index.min()
            idx_end = group.index.max()

            last_row = group.iloc[-1]  # Using
            is_oil_active = (last_row[self.KEY_ACTUAL_OIL] > 0) & (last_row[self.KEY_POTENTIAL_OIL] > 0)
            is_gas_active = (last_row[self.KEY_ACTUAL_GAS] > 0) & (last_row[self.KEY_POTENTIAL_GAS] > 0)
            is_water_active = (last_row[self.KEY_ACTUAL_WATER] > 0) & (last_row[self.KEY_POTENTIAL_WATER] > 0)

            n_data = len(group)
            actual_oil = [group[self.KEY_ACTUAL_OIL].min(), group[self.KEY_ACTUAL_OIL].max(), group[self.KEY_ACTUAL_OIL].sum()]
            actual_water = [group[self.KEY_ACTUAL_WATER].min(), group[self.KEY_ACTUAL_WATER].max(), group[self.KEY_ACTUAL_WATER].sum()]
            actual_gas = [group[self.KEY_ACTUAL_GAS].min(), group[self.KEY_ACTUAL_GAS].max(), group[self.KEY_ACTUAL_GAS].sum()]
            potential_oil = [group[self.KEY_POTENTIAL_OIL].min(), group[self.KEY_POTENTIAL_OIL].max(), group[self.KEY_POTENTIAL_OIL].sum()]
            potential_water = [group[self.KEY_POTENTIAL_WATER].min(), group[self.KEY_POTENTIAL_WATER].max(),
                               group[self.KEY_POTENTIAL_WATER].sum()]
            potential_gas = [group[self.KEY_POTENTIAL_GAS].min(), group[self.KEY_POTENTIAL_GAS].max(), group[self.KEY_POTENTIAL_GAS].sum()]

            # Add platform details to the summary
            data_list.append(
                {
                    "name": group_key,
                    "isOilActive": int(is_oil_active.astype(int)),
                    "isGasActive": int(is_gas_active.astype(int)),
                    "isWaterActive": int(is_water_active.astype(int)),
                })
            data_summary[group_key] = {
                "name": group_key,
                "region": region,
                "platform": platform,
                "idxStart": int(idx_start),
                "idxEnd": int(idx_end),
                "ndata": n_data,
                "isOilActive": int(is_oil_active.astype(int)),
                "isGasActive": int(is_gas_active.astype(int)),
                "isWaterActive": int(is_water_active.astype(int)),
                "min": {
                    self.KEY_ACTUAL_OIL_: float(actual_oil[0]),
                    self.KEY_ACTUAL_WATER_: float(actual_water[0]),
                    self.KEY_ACTUAL_GAS_: float(actual_gas[0]),
                    self.KEY_POTENTIAL_OIL_: float(potential_oil[0]),
                    self.KEY_POTENTIAL_WATER_: float(potential_water[0]),
                    self.KEY_POTENTIAL_GAS_: float(potential_gas[0]),
                },
                "max": {
                    self.KEY_ACTUAL_OIL_: float(actual_oil[1]),
                    self.KEY_ACTUAL_WATER_: float(actual_water[1]),
                    self.KEY_ACTUAL_GAS_: float(actual_gas[1]),
                    self.KEY_POTENTIAL_OIL_: float(potential_oil[1]),
                    self.KEY_POTENTIAL_WATER_: float(potential_water[1]),
                    self.KEY_POTENTIAL_GAS_: float(potential_gas[1]),
                },
                "total": {
                    self.KEY_ACTUAL_OIL_: float(actual_oil[2]),
                    self.KEY_ACTUAL_WATER_: float(actual_water[2]),
                    self.KEY_ACTUAL_GAS_: float(actual_gas[2]),
                    self.KEY_POTENTIAL_OIL_: float(potential_oil[2]),
                    self.KEY_POTENTIAL_WATER_: float(potential_water[2]),
                    self.KEY_POTENTIAL_GAS_: float(potential_gas[2]),
                },
            }
        return data_list, data_summary

    def create_best_platform(self, platform_summary, key_item, n=5):
        # Convert summary_data to a DataFrame for sorting
        summary_df = pd.DataFrame([
            {
                "platform_name": platform,
                "total_data": details["total"][key_item],
            }
            for platform, details in platform_summary.items()
        ])

        # Sort by total_actual_oil in descending order and get top 5
        top_data = summary_df.sort_values(by="total_data", ascending=False).head(n)

        # Convert back to dictionary if needed
        top_summary = {
            row["platform_name"]: platform_summary[row["platform_name"]]
            for _, row in top_data.iterrows()
        }
        return top_summary

    def create_region_summary(self, platform_summary):
        regions_ = {}
        for platform, details in platform_summary.items():
            region = details["region"]
            if region not in regions_:
                regions_[region] = {
                    "name": region,
                    "platform": [],
                }
            regions_[region]["platform"].append(platform)

        region_summary = {}
        for region, details in regions_.items():
            region_summary[region] = {
                "name": details["name"],
                "platform": len(details["platform"]),
                "well_total": sum([platform_summary[platform]["well_total"] for platform in details["platform"]]),
            }
        return region_summary

    def create_platform_summary(self, df, wells_summary, group_by=None):
        result = {}
        for item in wells_summary.values():
            platform = item[group_by]
            value = item["value"]
            if platform not in result:
                result[platform] = {
                    "name": platform,
                    "region": item["region"],
                    "total_wells": 0,
                    "min": {
                        self.KEY_ACTUAL_OIL_: 0,
                        self.KEY_ACTUAL_WATER_: 0,
                        self.KEY_ACTUAL_GAS_: 0,
                        self.KEY_POTENTIAL_OIL_: 0,
                        self.KEY_POTENTIAL_WATER_: 0,
                        self.KEY_POTENTIAL_GAS_: 0,
                    },
                    "max": {
                        self.KEY_ACTUAL_OIL_: 0,
                        self.KEY_ACTUAL_WATER_: 0,
                        self.KEY_ACTUAL_GAS_: 0,
                        self.KEY_POTENTIAL_OIL_: 0,
                        self.KEY_POTENTIAL_WATER_: 0,
                        self.KEY_POTENTIAL_GAS_: 0,
                    },
                    "total": {
                        self.KEY_ACTUAL_OIL_: 0,
                        self.KEY_ACTUAL_WATER_: 0,
                        self.KEY_ACTUAL_GAS_: 0,
                        self.KEY_POTENTIAL_OIL_: 0,
                        self.KEY_POTENTIAL_WATER_: 0,
                        self.KEY_POTENTIAL_GAS_: 0,
                    },
                }
            result[platform]["total_wells"] += 1
            result[platform]["sumValue"] += value

    def __init__(self):
        df = LibUtils.read_excel_file(self.excelFileName)
        df.sort_values(by=[self.KEY_WELL_NAME, "date"], inplace=True)  # Sort by 'well_name' and 'date'
        df.reset_index(drop=True, inplace=True)  # Reset index for a clean display (optional)

        # --------------------------------------------------------------------------------
        # Create well summary
        # --------------------------------------------------------------------------------
        well_list, wells_summary = self.create_well_summary(df,
                                                            group_by=self.KEY_WELL_NAME,
                                                            key_region=self.KEY_REGION,
                                                            key_platform=self.KEY_PLATFORM)

        # --------------------------------------------------------------------------------
        # Create platform summary
        # --------------------------------------------------------------------------------
        self.create_platform_summary(df, wells_summary, group_by=self.KEY_PLATFORM)

        self.data["data"] = df.to_dict(orient="records")
        self.data["wells"] = {
            "list": well_list,
            "summary": wells_summary,
        }
        # self.data["platform"] = {
        #     "list": platform_list,
        #     "summary": platform_summary,
        # }

        # Group by platform_name
        # platform_list, platform_summary = self.create_platform_summary(wells_summary, group_by=self.KEY_PLATFORM)

        # self.data["region"] = region_summary
        # self.data["platform"] = platform_summary


        # self.data["platform"] = {
        #     "data": platform_summary,
        #     "best": {
        #         self.KEY_ACTUAL_OIL_: self.create_best_platform(platform_summary, self.KEY_ACTUAL_OIL_, 5),
        #         self.KEY_ACTUAL_WATER_: self.create_best_platform(platform_summary, self.KEY_ACTUAL_WATER_, 5),
        #         self.KEY_ACTUAL_GAS_: self.create_best_platform(platform_summary, self.KEY_ACTUAL_GAS_, 5),
        #         self.KEY_POTENTIAL_OIL_: self.create_best_platform(platform_summary, self.KEY_POTENTIAL_OIL_, 5),
        #         self.KEY_POTENTIAL_WATER_: self.create_best_platform(platform_summary, self.KEY_POTENTIAL_WATER_, 5),
        #         self.KEY_POTENTIAL_GAS_: self.create_best_platform(platform_summary, self.KEY_POTENTIAL_GAS_, 5),
        #     }
        # }
        #
        # region_summary = self.create_region_summary(platform_summary)
        # self.data["region"] = region_summary


    def get_wells_list(self):
        return self.data["wells"]["list"]

    def get_wells_open(self, well_name):
        if well_name not in self.data["wells"]["list"]:
            return None
        else:
            selected = self.data["wells"]["summary"][well_name]
            df = self.data["data"][selected["idxStart"]:selected["idxEnd"]]

            # data_list = df_copy.to_dict(orient="records")
            result = {
                "info": selected,
                "data": df,
            }
            return result
