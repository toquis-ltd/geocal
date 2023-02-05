from ...models.Repport import Repport

class CreateRepport():
    def __init__(self, data):
        Repport(subject=data.get("subject"), email=data.get("email"), message=data.get("message")).save()