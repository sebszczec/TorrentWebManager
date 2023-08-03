import subprocess



class TransmissionManager:
    class Constants(object):
        TransmissionPath = "/opt/homebrew/bin/transmission-remote"
        TransmissionAddFlag = "-a"
        TransmissionListFlag = "-l"
        TransmissionTorrentFlag = "-t"
        TransmissionRemoveFlag = "-r"

    def add_torrent(torrent):
        subprocess.run([TransmissionManager.Constants.TransmissionPath,
                    TransmissionManager.Constants.TransmissionAddFlag,
                    torrent])

    def list_torrents():
        result = subprocess.run([TransmissionManager.Constants.TransmissionPath,
                            TransmissionManager.Constants.TransmissionListFlag],
                            capture_output=True)
        
        return result.stdout.decode()

    def remove_torrent(torrent):
        subprocess.run([TransmissionManager.Constants.TransmissionPath,
                    TransmissionManager.Constants.TransmissionTorrentFlag,
                    torrent,
                    TransmissionManager.Constants.TransmissionRemoveFlag])