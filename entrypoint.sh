export OTEL_EXPORTER_OTLP_ENDPOINT="otlp.uptrace.dev:4317"
export OTEL_EXPORTER_OTLP_ENDPOINT="https://otlp.uptrace.dev"
export OTEL_EXPORTER_OTLP_HEADERS="uptrace-dsn=https://jPVj9ME_WIP9N6bzrIbDvg@api.uptrace.dev/2425"
export OTEL_EXPORTER_OTLP_COMPRESSION=gzip

gunicorn -c ./gunicorn.conf.py main:app --bind 0.0.0.0:8000 -w 24 -k uvicorn.workers.UvicornWorker