cat > src/environments/environment.prod.ts <<EOF
export const environment = {
  api: "https://free-sons-backend.herokuapp.com/",
  production: true,
  api_token: "$BACKEND_API_TOKEN"
}
EOF