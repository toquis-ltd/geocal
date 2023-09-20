import uptrace
from opentelemetry import trace

def post_fork(server, worker):
    uptrace.configure_opentelemetry(
        dsn="https://jPVj9ME_WIP9N6bzrIbDvg@api.uptrace.dev/2425",
        service_name="mapless",
        service_version="0.0.1",
        deployment_environment="production",
    )
    tracer = trace.get_tracer("mapless", "1.0.0")


