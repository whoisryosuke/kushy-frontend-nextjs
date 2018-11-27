export default {
  tokenName: "kushyFToken",
  kushyApiUrl: "http://localhost/api/v1",
  kushyLogin:
    "http://localhost/oauth/authorize/?client_id=1&redirect_uri=http://localhost:3000/token&response_type=code&scope=access-user-account",
  assets: {
    root: "https://s3.amazonaws.com/kushy-frontend-assets/",
    public: "https://s3.amazonaws.com/kushy-frontend-assets/",
    site: "assets/",
    uploads: "uploads/"
  }
};