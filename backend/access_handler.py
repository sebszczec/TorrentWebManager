class AccessManager:
    class Constants(object):
        Password = "alejaja666^^^"

    def check_password(password):
        if password == AccessManager.Constants.Password:
            return True
        return False
