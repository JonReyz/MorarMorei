FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /MorarMorei
WORKDIR /MorarMorei
COPY Gemfile /MorarMorei/Gemfile
COPY Gemfile.lock /MorarMorei/Gemfile.lock
RUN bundle install
COPY . /MorarMorei
