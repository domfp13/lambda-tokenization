FROM public.ecr.aws/lambda/nodejs:14

LABEL maintainer="Enrique Plata"

COPY package.json ./

RUN npm install

COPY app.js ./

CMD ["app.lambdaHandler"]
