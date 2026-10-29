"""
Convenience Runner for CarFair Python Backend
"""
import sys
import os
import uvicorn

if __name__ == "__main__":
    # Ensure server directory is in sys.path
    server_dir = os.path.dirname(os.path.abspath(__file__))
    if server_dir not in sys.path:
        sys.path.insert(0, server_dir)

    port = int(os.environ.get("PORT", 5000))
    print(f"🚗 CarFair Python API running at: http://localhost:{port}")
    print(f"📚 Interactive Swagger Docs at: http://localhost:{port}/docs")
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)
