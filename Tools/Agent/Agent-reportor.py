#!/usr/bin/env python3
"""
Lightweight device agent demo.
Sends basic telemetry to the /api/devices/report endpoint.
"""

import platform, socket, json, uuid, time, requests, os

API_URL = os.environ.get("ITSUPPORT_API", "http://localhost:4000/api/devices/report")
DEVICE_ID = os.environ.get("DEVICE_ID", str(uuid.uuid4()))
CLIENT_ID = os.environ.get("CLIENT_ID", None)

def gather():
    hostname = socket.gethostname()
    osver = platform.platform()
    # minimal CPU/mem snapshot
    try:
        import psutil
        cpu = {"percent": psutil.cpu_percent(interval=1)}
        mem = {"total": psutil.virtual_memory().total, "available": psutil.virtual_memory().available, "percent": psutil.virtual_memory().percent}
        disk = {"total": psutil.disk_usage("/").total, "free": psutil.disk_usage("/").free, "percent": psutil.disk_usage("/").percent}
    except Exception:
        cpu, mem, disk = {}, {}, {}
    payload = {
        "device_id": DEVICE_ID,
        "hostname": hostname,
        "os": osver,
        "cpu": cpu,
        "memory": mem,
        "disk": disk,
        "client_id": CLIENT_ID
    }
    return payload

def send(payload):
    try:
        resp = requests.post(API_URL, json=payload, timeout=10)
        print("Status:", resp.status_code, resp.text)
    except Exception as e:
        print("Send failed:", e)

if __name__ == "__main__":
    p = gather()
    print("Reporting payload:", json.dumps(p, indent=2))
    send(p)
