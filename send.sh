#!/usr/bin/env bash

for first_word in tartuffes unfunded pyramided gribbles unideaed sociopaths greening pulsated circumferences ; do
  for second_word in occupancies ulans grabby condores stupendousness respirometers brasseries logomachies hetero ecocide; do
    curl -s -X POST $(aws apigatewayv2 get-apis | yq '.Items[] | select(.Name == "dev-tsanghan-ce6-dynamodb-sqs-service") | .ApiEndpoint')/ --data-raw '{"'"$first_word"'":"'"$second_word"'"}'
    echo
  done
done