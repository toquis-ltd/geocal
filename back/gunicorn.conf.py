import os
import uptrace
from opentelemetry import trace

def post_fork(server, worker):
    uptrace.configure_opentelemetry(
        dsn=os.environ.get('UPTRACE_DSN'),
        service_name="mapless",
        service_version="0.0.1",
        deployment_environment="production",
    )
    tracer = trace.get_tracer("mapless", "0.0.1")


