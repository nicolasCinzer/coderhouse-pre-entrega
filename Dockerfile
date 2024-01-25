FROM node:lts-alpine

# ENVIROMENTS VARIABLES
ENV DB_URL=mongodb+srv://nicolascinzer00:niJ80qDPNmaUlyLS@ecommerce.syps22c.mongodb.net/eCommerce?retryWrites=true&w=majority
ENV ADMIN_PASSWORD=upperwest123
ENV ADMIN_MAIL=nicolas@admin.com
ENV GITHUB_CLIENT_ID=Iv1.92c9fe7ef514fa82
ENV GITHUB_CLIENT_SECRET=10c9a705d67a6ac9fc8904639e4e7f51cd2ff489
ENV GITHUB_CALLBACK_URL=http://localhost:8080/api/sessions/auth/github/callback
ENV GOOGLE_CLIENT_ID=271973480289-g2niv24k438q9e1aa5fl6pnsf0jbm28f.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV GOOGLE_CALLBACK_URL=http://localhost:8080/api/sessions/auth/google/callback
ENV JWT_SECRET_KEY=listocalistomirey12345
ENV COOKIE_SECRET_KEY=listocalistomirey12345
ENV PORT=8080
ENV NODEMAILER_EMAIL=nicolas.cinzer00@gmail.com
ENV NODEMAILER_PASSWORD=kqwbnhocthqpmxum
ENV ENVIROMENT=PRD

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install
COPY . .

EXPOSE 8080
RUN chown -R node /usr/src/app

USER node
CMD ["npm", "start"]
