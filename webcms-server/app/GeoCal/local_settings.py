import psycopg2

SECRET_KEY = "123"
ALLOWED_HOSTS = ['*']
CORS_ALLOW_ALL_ORIGINS = True

def allow_corsheaders(MIDDLEWARE, INSTALLED_APPS):
    MIDDLEWARE.insert(-7, 'corsheaders.middleware.CorsMiddleware')
    INSTALLED_APPS.insert(-5, 'corsheaders')

CORS_ORIGIN_WHITELIST = (
    'http://127.0.0.1:3000',
    'http://192.168.0.18:3000',
)