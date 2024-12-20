import os
from datetime import datetime

import pandas as pd


class LibUtils:

    @staticmethod
    def read_excel_file(file_path):
        # Load the Excel file
        sheets = pd.read_excel(file_path, sheet_name=None)  # Use sheet_name=None to load all sheets

        # Get the name of the first sheet
        first_sheet_name = list(sheets.keys())[0]

        # Access the DataFrame of the first sheet
        data = sheets[first_sheet_name]

        data.fillna(0, inplace=True)  # Replace NaN with 0

        df = pd.DataFrame(data)

        # Check if the "date" column exists and convert it to datetime format
        if "date" in df.columns:
            df["date"] = pd.to_datetime(df["date"])  # Convert to datetime
            df["date"] = df["date"].dt.strftime('%Y-%m-%d')  # Format to yyyy-MM-dd

        return df

    @staticmethod
    def get_list_file(directory):
        files = []
        for filename in os.listdir(directory):
            filepath = os.path.join(directory, filename)
            if os.path.isfile(filepath):
                file_info = {
                    "filename": filename,
                    "size": os.path.getsize(filepath),
                    "last_update": datetime.fromtimestamp(os.path.getmtime(filepath)).strftime('%Y-%m-%d %H:%M:%S'),
                    "url": f"{directory.replace('.', '')}/{filename}"

                }
                files.append(file_info)

        return files
