# https://dev.to/michalbryxi/volta-in-docker-162a
FROM docker.io/library/ubuntu:24.04

ARG UID
ARG GID

RUN apt-get update && apt-get install -y curl ca-certificates

RUN groupadd --gid ${GID} --force project
RUN useradd --non-unique --home /home/developer/ --gid ${GID} --create-home --shell /bin/bash --uid ${UID} developer
USER developer

ENV BASH_ENV ~/.bashrc
ENV VOLTA_HOME /home/developer/.volta
ENV PATH $VOLTA_HOME/bin:$PATH
ENV VOLTA_FEATURE_PNPM 1

RUN curl https://get.volta.sh | bash
