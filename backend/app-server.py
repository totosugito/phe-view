import os

from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from flask_compress import Compress

from lib.LibUtils import LibUtils
from lib.LibWellProduction import LibWellProduction

app = Flask(__name__)
app.config['COMPRESS_ALGORITHM'] = 'gzip'  # Options: gzip, br (Brotli)
app.config['COMPRESS_LEVEL'] = 6  # Compression level (1-9 for gzip, 1-11 for Brotli)
app.config['COMPRESS_MIN_SIZE'] = 500  # Minimum size (in bytes) before compression
Compress(app)

CORS(app, resources={r"/*": {"origins": "*"}})  # Disable CORS for all routes
app.config['CORS_HEADERS'] = 'Content-Type'

# excelFileName = "./data/Demo.xlsx"
excelWellProduction = "./data/report/Daily_Production_Volume_By_WELLS_Jan-Dec2024_Cleaned-MINI.xlsx"
# excelWellProduction = "./data/report/Daily_Production_Volume_By_WELLS_Jan-Dec2024_Cleaned.xlsx"

msgFileDir = "./data/msg"
baseApiWellsProd2024 = "/api/wells-prod2024"

# Load the data
lib_well_production = LibWellProduction(excel_file_name=excelWellProduction)


@app.route('/')
def hello_world():  # put application's code here
    return 'App Server is running!'


# ------------------------------ MSG FILE -----------------------------
@app.route(baseApiWellsProd2024 + '/msg/list', methods=['GET'])
def get_msg_list():
    file_list = LibUtils.get_list_file(msgFileDir)
    return jsonify({"success": True, "data": sorted(file_list, key=lambda x: x['filename'])}), 200


@app.route('/data/msg/<filename>', methods=['GET'])
def serve_file(filename):
    try:
        return send_from_directory(msgFileDir, filename, as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 404


# ------------------------------ REGION -----------------------------
@app.route(baseApiWellsProd2024 + '/region/summary', methods=['GET'])
def get_region_summary():
    return jsonify({"success": True, "data": lib_well_production.get_region_summary()}), 200


@app.route(baseApiWellsProd2024 + '/region/list', methods=['GET'])
def get_region_list():
    return jsonify({"success": True, "data": lib_well_production.get_region_list()}), 200


@app.route(baseApiWellsProd2024 + '/region/open/<string:region_name>', methods=['GET'])
def get_region_open(region_name):
    return jsonify({"success": True, "data": lib_well_production.get_region_open(region_name)}), 200


@app.route(baseApiWellsProd2024 + '/region/best-platform', methods=['GET'])
def get_region_best():
    return jsonify({"success": True, "data": lib_well_production.get_region_best_platform()}), 200


# ------------------------------ PLATFORM -----------------------------
@app.route(baseApiWellsProd2024 + '/platform/summary', methods=['GET'])
def get_platform_summary():
    return jsonify({"success": True, "data": lib_well_production.get_platform_summary()}), 200


@app.route(baseApiWellsProd2024 + '/platform/list', methods=['GET'])
def get_platform_list():
    return jsonify({"success": True, "data": lib_well_production.get_platform_list()}), 200


@app.route(baseApiWellsProd2024 + '/platform/open/<string:platform_name>', methods=['GET'])
def get_platform_open(platform_name):
    return jsonify({"success": True, "data": lib_well_production.get_platform_open(platform_name)}), 200


@app.route(baseApiWellsProd2024 + '/platform/best-wells', methods=['GET'])
def get_platform_best():
    return jsonify({"success": True, "data": lib_well_production.get_platform_best_wells()}), 200


# ------------------------------ Wells -----------------------------
@app.route(baseApiWellsProd2024 + '/wells/list', methods=['GET'])
def get_wells_list():
    return jsonify({"success": True, "data": lib_well_production.get_wells_list()}), 200


@app.route(baseApiWellsProd2024 + '/wells/open/<string:wells_name>', methods=['GET'])
def get_wells_open(wells_name):
    return jsonify({"success": True, "data": lib_well_production.get_wells_open(wells_name)}), 200


# ------------------------------------------------------------------------------
# Run the application
# ------------------------------------------------------------------------------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5157)
