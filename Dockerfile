FROM zhulinpinyu/json-server

MAINTAINER zhulinpinyu "lixiangmu@gmail.com"

EXPOSE 3000
VOLUME [ "/app" ]
WORKDIR /app

ADD web/dist/ /app/public
ADD server/routes.json /app

# Define default command.
ENTRYPOINT ["json-server", "data/db.json", "--routes", "routes.json"]
