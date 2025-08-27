from fastapi import FastAPI
import get_endpoints, post_endpoints
import config
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(docs_url=config.documentation_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=get_endpoints.app, prefix="/get")
app.include_router(router=post_endpoints.app, prefix="/post")


@app.get("/")
def root():
    return {"message": "Hello World"}