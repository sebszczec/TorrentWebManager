# Import flask and datetime module for showing date and time
from flask import Flask
from flask import request
from flask_cors import CORS
from torrent_handler import TransmissionManager
from access_handler import AccessManager
import datetime
 
app = Flask(__name__, static_folder='./frontend', static_url_path='/')
 
@app.route('/')
def default_page():
    return app.send_static_file('index.html')

@app.route('/torrent_list')
def get_torrent_list():
    now = datetime.datetime.now()
    tsm_list = TransmissionManager.list_torrents()

    to_replace = ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h',
            'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P',
            'p', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'W', 'w', 'V', 'v', 'Y', 'y', 'Z', 'z']

    for letter in to_replace:
        tsm_list = tsm_list.replace(letter, "#")

    return { 
        'torrent_list' : tsm_list,
        'refresh_time' : now
        }

@app.route('/add_torrent', methods=['POST'])
def add_torrent():
    data = request.get_json()
    password = data['password']
    link = data['torrent']

    if AccessManager.check_password(password) is False:
        return 'Wrong password', 401

    TransmissionManager.add_torrent(link)
    return 'Done', 201 

@app.route('/remove_torrent', methods=['POST'])
def remove_torrent():
    data = request.get_json()
    password = data['password']
    link = data['torrent']

    if AccessManager.check_password(password) is False:
        return 'Wrong password', 401

    TransmissionManager.remove_torrent(link)
    return 'Done', 201 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)