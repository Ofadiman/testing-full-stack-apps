# https://dev.to/michalbryxi/volta-in-docker-162a
FROM docker.io/library/ubuntu:24.04

RUN apt-get update && apt-get install -y curl ca-certificates

SHELL ["/bin/bash", "-c"]

ENV BASH_ENV ~/.bashrc
ENV VOLTA_HOME /root/.volta
ENV PATH $VOLTA_HOME/bin:$PATH
ENV VOLTA_FEATURE_PNPM 1

RUN curl https://get.volta.sh | bash
