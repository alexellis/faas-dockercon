package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
)

func getResponse(urlIn string) *http.Response {
	token := os.Getenv("access_token")

	client := http.Client{}
	url1, _ := url.Parse(urlIn)
	req := http.Request{
		URL:    url1,
		Header: http.Header{},
	}
	req.Header.Set("Authorization", fmt.Sprintf("External %s", token))
	res, err := client.Do(&req)

	if err != nil {
		log.Fatalln(err.Error())
	}

	return res
}

func getKeywordResponse() *BraindateTopicResponse {
	res := getResponse("https://api.e-180.com/plugins/statistics/popular_topic/?group=54")

	response := BraindateTopicResponse{}
	if res.StatusCode == 200 {
		body, _ := ioutil.ReadAll(res.Body)
		json.Unmarshal(body, &response)
	}

	return &response
}

func getMingleResponse() *BraindateResponse {
	res := getResponse("https://api.e-180.com/plugins/statistics/braindates_count/?group=54")

	response := BraindateResponse{
		Past: -1,
	}
	if res.StatusCode == 200 {
		body, _ := ioutil.ReadAll(res.Body)
		json.Unmarshal(body, &response)
	}

	return &response
}

