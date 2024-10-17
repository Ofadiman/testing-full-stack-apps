# https://dev.to/michalbryxi/volta-in-docker-162a
FROM docker.io/library/ubuntu:24.04

RUN apt-get update && \
    apt-get install -y curl ca-certificates gcc jq && \
    rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENV BASH_ENV ~/.bashrc
ENV VOLTA_HOME /home/ubuntu/.volta
ENV PATH $VOLTA_HOME/bin:$PATH
ENV VOLTA_FEATURE_PNPM 1

RUN curl https://get.volta.sh | bash

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
