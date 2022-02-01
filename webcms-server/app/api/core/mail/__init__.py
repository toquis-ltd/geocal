from django.core import mail

class IssueRepportMail():
    def __init__ (self, data):
        # data = dict(data)
        subject = f"Mapless {data.get('subject', 'No subject')} issue repport"
        message = (f"""Hello, Dear mapless team I do have a problem with your converter\n
            Here is the discription of my problem:\n\n\t\t\t {data.get('message', 'No message')}\n\n"""+
            f"My contact email: {data.get('email', 'No email')}\n\nBest regards")
        
        files = []   
        for i, j in zip(data.keys(), data.values()):
            if 'img-' in i:
                files.append((i, j.read(), 'image/png'))
        
        with mail.get_connection() as connection:
            message = mail.EmailMessage(
                            subject=subject,
                            body=message,
                            to=["jakoganesyan@gmail.com"],
                            attachments=files,
                            connection=connection
                        ).send()
