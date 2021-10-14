#!/usr/bin python

import http.server, socketserver, os, pathlib

PORT = 8000
BASE_DIR = pathlib.Path(__file__).resolve().parent.parent
FILE_PATH = os.path.join(BASE_DIR, "globe/public", "index.html")


class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = './public/index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

handler_object = MyHttpRequestHandler

socketserver.TCPServer.allow_reuse_address = True
my_server = socketserver.TCPServer(("", PORT), handler_object)

print(f'http://localhost:{PORT}')
my_server.serve_forever()