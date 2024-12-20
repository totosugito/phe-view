from lib.LibUtils import LibUtils


class LibWellProduction:
    excelFileName = None

    data = {
        "region": {
            "list": [],
            "details": {},
            "best_platform": {},
            "summary": {}
        },
        "platform": {
            "list": [],
            "details": {},
            "best_wells": {},
            "summary": {},
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
    KEY_REGION_TYPE = "region_type"
    GROUP_TYPE_REGION = "region"
    GROUP_TYPE_PLATFORM = "platform"
    GROUP_TYPE_WELL = "well"

    def create_well_summary(self, df, group_by=None, key_region=None, key_platform=None):
        grouped = df.groupby(group_by)

        data_summary = {}
        data_list = []
        for group_key, group in grouped:
            region = group[key_region].iloc[0]
            platform = group[key_platform].iloc[0]
            idx_start = group.index.min()
            idx_end = group.index.max()

            # Drop duplicate dates, keeping the first occurrence and convert to dictionary
            dt_unique = group.drop_duplicates(subset='date', keep='first')
            group_data = dt_unique.set_index('date').to_dict(orient='index')

            last_row = group.iloc[-1]  # Using
            is_oil_active = (last_row[self.KEY_ACTUAL_OIL] > 0) | (last_row[self.KEY_POTENTIAL_OIL] > 0)
            is_gas_active = (last_row[self.KEY_ACTUAL_GAS] > 0) | (last_row[self.KEY_POTENTIAL_GAS] > 0)
            is_water_active = (last_row[self.KEY_ACTUAL_WATER] > 0) | (last_row[self.KEY_POTENTIAL_WATER] > 0)

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
                self.KEY_REGION: region,
                self.KEY_PLATFORM: platform,
                "idxStart": int(idx_start),
                "idxEnd": int(idx_end),
                "ndata": n_data,
                "isOilActive": int(is_oil_active.astype(int)),
                "isGasActive": int(is_gas_active.astype(int)),
                "isWaterActive": int(is_water_active.astype(int)),
                "min": {
                    self.KEY_ACTUAL_OIL: float(actual_oil[0]),
                    self.KEY_ACTUAL_WATER: float(actual_water[0]),
                    self.KEY_ACTUAL_GAS: float(actual_gas[0]),
                    self.KEY_POTENTIAL_OIL: float(potential_oil[0]),
                    self.KEY_POTENTIAL_WATER: float(potential_water[0]),
                    self.KEY_POTENTIAL_GAS: float(potential_gas[0]),
                },
                "max": {
                    self.KEY_ACTUAL_OIL: float(actual_oil[1]),
                    self.KEY_ACTUAL_WATER: float(actual_water[1]),
                    self.KEY_ACTUAL_GAS: float(actual_gas[1]),
                    self.KEY_POTENTIAL_OIL: float(potential_oil[1]),
                    self.KEY_POTENTIAL_WATER: float(potential_water[1]),
                    self.KEY_POTENTIAL_GAS: float(potential_gas[1]),
                },
                "total": {
                    self.KEY_ACTUAL_OIL: float(actual_oil[2]),
                    self.KEY_ACTUAL_WATER: float(actual_water[2]),
                    self.KEY_ACTUAL_GAS: float(actual_gas[2]),
                    self.KEY_POTENTIAL_OIL: float(potential_oil[2]),
                    self.KEY_POTENTIAL_WATER: float(potential_water[2]),
                    self.KEY_POTENTIAL_GAS: float(potential_gas[2]),
                },
                "data": group_data
            }
        return data_list, data_summary

    def create_data_summary(self, dict_summary, group_by=None, group_type=None):
        summary = {}
        for item in dict_summary.values():
            selected = item[group_by]
            if selected not in summary:
                summary[selected] = {
                    "name": selected,
                    self.KEY_REGION: item[self.KEY_REGION],
                    self.KEY_PLATFORM: item[self.KEY_PLATFORM],
                    self.KEY_REGION_TYPE: group_type,
                    "total_wells": 0,
                    "total_platform": 0,
                    "total_region": 0,
                    "isGasActive": 0,
                    "isOilActive": 0,
                    "isWaterActive": 0,
                    "data": {},
                    "min": {
                        self.KEY_ACTUAL_OIL: 0,
                        self.KEY_ACTUAL_WATER: 0,
                        self.KEY_ACTUAL_GAS: 0,
                        self.KEY_POTENTIAL_OIL: 0,
                        self.KEY_POTENTIAL_WATER: 0,
                        self.KEY_POTENTIAL_GAS: 0,
                    },
                    "max": {
                        self.KEY_ACTUAL_OIL: 0,
                        self.KEY_ACTUAL_WATER: 0,
                        self.KEY_ACTUAL_GAS: 0,
                        self.KEY_POTENTIAL_OIL: 0,
                        self.KEY_POTENTIAL_WATER: 0,
                        self.KEY_POTENTIAL_GAS: 0,
                    },
                    "total": {
                        self.KEY_ACTUAL_OIL: 0,
                        self.KEY_ACTUAL_WATER: 0,
                        self.KEY_ACTUAL_GAS: 0,
                        self.KEY_POTENTIAL_OIL: 0,
                        self.KEY_POTENTIAL_WATER: 0,
                        self.KEY_POTENTIAL_GAS: 0,
                    },
                }

            if "total_wells" in item:
                summary[selected]["total_wells"] += item["total_wells"]
            else:
                summary[selected]["total_wells"] += 1
                summary[selected]["total_platform"] = 1

            if "total_platform" in item:
                summary[selected]["total_platform"] += item["total_platform"]
            else:
                summary[selected]["total_platform"] = 1

            if (group_by == self.KEY_REGION_TYPE) and (group_type == self.GROUP_TYPE_REGION):
                summary[selected]["total_region"] += 1
            else:
                summary[selected]["total_region"] = 1

            summary[selected]["isGasActive"] += item["isGasActive"]
            summary[selected]["isOilActive"] += item["isOilActive"]
            summary[selected]["isWaterActive"] += item["isWaterActive"]

            cur_key = "min"
            summary[selected][cur_key][self.KEY_ACTUAL_OIL] = min(summary[selected][cur_key][self.KEY_ACTUAL_OIL],
                                                                  item[cur_key][self.KEY_ACTUAL_OIL])
            summary[selected][cur_key][self.KEY_ACTUAL_WATER] = min(summary[selected][cur_key][self.KEY_ACTUAL_WATER],
                                                                    item[cur_key][self.KEY_ACTUAL_WATER])
            summary[selected][cur_key][self.KEY_ACTUAL_GAS] = min(summary[selected][cur_key][self.KEY_ACTUAL_GAS],
                                                                  item[cur_key][self.KEY_ACTUAL_GAS])
            summary[selected][cur_key][self.KEY_POTENTIAL_OIL] = min(summary[selected][cur_key][self.KEY_POTENTIAL_OIL],
                                                                     item[cur_key][self.KEY_POTENTIAL_OIL])
            summary[selected][cur_key][self.KEY_POTENTIAL_WATER] = min(summary[selected][cur_key][self.KEY_POTENTIAL_WATER],
                                                                       item[cur_key][self.KEY_POTENTIAL_WATER])
            summary[selected][cur_key][self.KEY_POTENTIAL_GAS] = min(summary[selected][cur_key][self.KEY_POTENTIAL_GAS],
                                                                     item[cur_key][self.KEY_POTENTIAL_GAS])

            cur_key = "max"
            summary[selected][cur_key][self.KEY_ACTUAL_OIL] = max(summary[selected][cur_key][self.KEY_ACTUAL_OIL],
                                                                  item[cur_key][self.KEY_ACTUAL_OIL])
            summary[selected][cur_key][self.KEY_ACTUAL_WATER] = max(summary[selected][cur_key][self.KEY_ACTUAL_WATER],
                                                                    item[cur_key][self.KEY_ACTUAL_WATER])
            summary[selected][cur_key][self.KEY_ACTUAL_GAS] = max(summary[selected][cur_key][self.KEY_ACTUAL_GAS],
                                                                  item[cur_key][self.KEY_ACTUAL_GAS])
            summary[selected][cur_key][self.KEY_POTENTIAL_OIL] = max(summary[selected][cur_key][self.KEY_POTENTIAL_OIL],
                                                                     item[cur_key][self.KEY_POTENTIAL_OIL])
            summary[selected][cur_key][self.KEY_POTENTIAL_WATER] = max(summary[selected][cur_key][self.KEY_POTENTIAL_WATER],
                                                                       item[cur_key][self.KEY_POTENTIAL_WATER])
            summary[selected][cur_key][self.KEY_POTENTIAL_GAS] = max(summary[selected][cur_key][self.KEY_POTENTIAL_GAS],
                                                                     item[cur_key][self.KEY_POTENTIAL_GAS])

            cur_key = "total"
            summary[selected][cur_key][self.KEY_ACTUAL_OIL] += item[cur_key][self.KEY_ACTUAL_OIL]
            summary[selected][cur_key][self.KEY_ACTUAL_WATER] += item[cur_key][self.KEY_ACTUAL_WATER]
            summary[selected][cur_key][self.KEY_ACTUAL_GAS] += item[cur_key][self.KEY_ACTUAL_GAS]
            summary[selected][cur_key][self.KEY_POTENTIAL_OIL] += item[cur_key][self.KEY_POTENTIAL_OIL]
            summary[selected][cur_key][self.KEY_POTENTIAL_WATER] += item[cur_key][self.KEY_POTENTIAL_WATER]
            summary[selected][cur_key][self.KEY_POTENTIAL_GAS] += item[cur_key][self.KEY_POTENTIAL_GAS]

            # fill the data
            for key in item["data"].keys():
                if key not in summary[selected]["data"]:
                    summary[selected]["data"][key] = {
                        self.KEY_ACTUAL_GAS: 0,
                        self.KEY_ACTUAL_OIL: 0,
                        self.KEY_ACTUAL_WATER: 0,
                        self.KEY_POTENTIAL_GAS: 0,
                        self.KEY_POTENTIAL_OIL: 0,
                        self.KEY_POTENTIAL_WATER: 0,
                    }
                summary[selected]["data"][key][self.KEY_ACTUAL_GAS] += item["data"][key][self.KEY_ACTUAL_GAS]
                summary[selected]["data"][key][self.KEY_ACTUAL_OIL] += item["data"][key][self.KEY_ACTUAL_OIL]
                summary[selected]["data"][key][self.KEY_ACTUAL_WATER] += item["data"][key][self.KEY_ACTUAL_WATER]
                summary[selected]["data"][key][self.KEY_POTENTIAL_GAS] += item["data"][key][self.KEY_POTENTIAL_GAS]
                summary[selected]["data"][key][self.KEY_POTENTIAL_OIL] += item["data"][key][self.KEY_POTENTIAL_OIL]
                summary[selected]["data"][key][self.KEY_POTENTIAL_WATER] += item["data"][key][self.KEY_POTENTIAL_WATER]

        # data_list = []
        # for item in summary.values():
        #     data_list.append(
        #         {
        #             "name": item["name"],
        #             "region": item["region"],
        #             # "platform_name": item["platform_name"],
        #             "isOilActive": item["isOilActive"],
        #             "isGasActive": item["isGasActive"],
        #             "isWaterActive": item["isWaterActive"],
        #             "total_wells": item["total_wells"],
        #             "total_platform": item["total_platform"],
        #         })

        return summary

    def create_best_data_summary_by_key(self, data_summary, key_item, n=5):
        sorted_data = sorted(data_summary.items(), key=lambda x: x[1]['total'][key_item], reverse=True)
        data = dict(sorted_data[:n])

        # Select only "key1" and "key3" for each "total"
        filtered_data = [
            {
                "name": v["name"],
                "region": v["region"],
                "platform_name": v["platform_name"],
                "total": {key: v["total"][key] for key in [self.KEY_ACTUAL_OIL, self.KEY_ACTUAL_WATER, self.KEY_ACTUAL_GAS,
                                                           self.KEY_POTENTIAL_OIL, self.KEY_POTENTIAL_WATER, self.KEY_POTENTIAL_GAS]}
            }
            for k, v in data.items()
        ]
        return filtered_data

    def get_summary_without_data_key(self, data_summary):
        return [{k: v for k, v in value.items() if k != "data"} for value in data_summary.values()]

    def create_best_data_summary(self, data_summary, n=5):
        return ({
            self.KEY_ACTUAL_OIL: self.create_best_data_summary_by_key(data_summary, self.KEY_ACTUAL_OIL, n),
            self.KEY_ACTUAL_WATER: self.create_best_data_summary_by_key(data_summary, self.KEY_ACTUAL_WATER, n),
            self.KEY_ACTUAL_GAS: self.create_best_data_summary_by_key(data_summary, self.KEY_ACTUAL_GAS, n),
            self.KEY_POTENTIAL_OIL: self.create_best_data_summary_by_key(data_summary, self.KEY_POTENTIAL_OIL, n),
            self.KEY_POTENTIAL_WATER: self.create_best_data_summary_by_key(data_summary, self.KEY_POTENTIAL_WATER, n),
            self.KEY_POTENTIAL_GAS: self.create_best_data_summary_by_key(data_summary, self.KEY_POTENTIAL_GAS, n),
        })

    def __init__(self, excel_file_name=None):
        self.excelFileName = excel_file_name
        df = LibUtils.read_excel_file(self.excelFileName)
        df.sort_values(by=[self.KEY_WELL_NAME, "date"], inplace=True)  # Sort by 'well_name' and 'date'
        df.reset_index(drop=True, inplace=True)  # Reset index for a clean display (optional)

        # --------------------------------------------------------------------------------
        # Create Wells summary
        # --------------------------------------------------------------------------------
        well_list, wells_summary = self.create_well_summary(df,
                                                            group_by=self.KEY_WELL_NAME,
                                                            key_region=self.KEY_REGION,
                                                            key_platform=self.KEY_PLATFORM)

        # --------------------------------------------------------------------------------
        # Create Platform summary
        # --------------------------------------------------------------------------------
        platform_details = self.create_data_summary(wells_summary, group_by=self.KEY_PLATFORM, group_type=self.GROUP_TYPE_PLATFORM)
        best_wells_by_platform = self.create_best_data_summary(wells_summary, n=5)
        platform_summary = {}

        # --------------------------------------------------------------------------------
        # Create Region summary
        # --------------------------------------------------------------------------------
        region_details = self.create_data_summary(platform_details, group_by=self.KEY_REGION, group_type=self.GROUP_TYPE_REGION)
        best_platforms_by_region = self.create_best_data_summary(platform_details, n=5)
        region_summary = self.create_data_summary(region_details, group_by=self.KEY_REGION_TYPE, group_type=self.GROUP_TYPE_REGION)

        # --------------------------------------------------------------------------------
        # Create Total summary
        # --------------------------------------------------------------------------------
        # total_list, total_summary = self.create_data_summary(region_summary, group_by=self.KEY_REGION)
        # print(total_summary)

        # --------------------------------------------------------------------------------
        # FILL THE DATA
        # --------------------------------------------------------------------------------
        self.data["wells"] = {
            "list": well_list,
            "summary": wells_summary,
        }
        self.data["platform"] = {
            "list": self.get_summary_without_data_key(platform_details),
            "details": platform_details,
            "summary": platform_summary,
            "best_wells": best_wells_by_platform,
        }
        self.data["region"] = {
            "list": self.get_summary_without_data_key(region_details),
            "details": region_details,
            "summary": region_summary,
            "best_platform": best_platforms_by_region,
        }

    # ------------------------------ REGION -----------------------------
    def get_region_summary(self):
        return self.data["region"]["summary"]

    def get_region_list(self):
        return self.data["region"]["list"]

    def get_region_open(self, region_name):
        if region_name not in self.data["region"]["details"]:
            return None
        else:
            selected = self.data["region"]["details"][region_name]
            return selected

    def get_region_best_platform(self):
        return self.data["region"]["best_platform"]

    # ------------------------------ PLATFORM -----------------------------
    def get_platform_summary(self):
        return self.data["platform"]["summary"]

    def get_platform_list(self):
        return self.data["platform"]["list"]

    def get_platform_open(self, platform_name):
        if platform_name not in self.data["platform"]["details"]:
            return None
        else:
            selected = self.data["platform"]["details"][platform_name]
            return selected

    def get_platform_best_wells(self):
        return self.data["platform"]["best_wells"]

    # ------------------------------ WELLS -----------------------------
    def get_wells_list(self):
        return self.data["wells"]["list"]

    def get_wells_open(self, well_name):
        if well_name not in self.data["wells"]["summary"]:
            return None
        else:
            selected = self.data["wells"]["summary"][well_name]
            return selected
