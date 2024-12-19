from flask import Flask,  jsonify
from flask_cors import CORS
from flask_compress import Compress

from lib.LibWellProduction import LibWellProduction

app = Flask(__name__)
app.config['COMPRESS_ALGORITHM'] = 'gzip'  # Options: gzip, br (Brotli)
app.config['COMPRESS_LEVEL'] = 6  # Compression level (1-9 for gzip, 1-11 for Brotli)
app.config['COMPRESS_MIN_SIZE'] = 500  # Minimum size (in bytes) before compression
Compress(app)

CORS(app, resources={r"/*": {"origins": "*"}})  # Disable CORS for all routes
app.config['CORS_HEADERS'] = 'Content-Type'

# Load the data
lib_well_production = LibWellProduction()


@app.route('/')
def hello_world():  # put application's code here
    return 'App Server is running!'


@app.route('/api/wells/list', methods=['GET'])
def get_wells_list():
    return jsonify({"data": lib_well_production.get_wells_list()}), 200


@app.route('/api/wells/open/<string:wells_name>', methods=['GET'])
def get_wells_open(wells_name):
    return jsonify({"data": lib_well_production.get_wells_open(wells_name)}), 200


# ------------------------------------------------------------------------------
# Run the application
# ------------------------------------------------------------------------------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5157)
