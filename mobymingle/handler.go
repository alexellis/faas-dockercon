package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func getKeywords() []string {
	res := getKeywordResponse()
	return []string{res.Braindates.Label, res.Content.Label}
}

func getBraindates() int {
	res := getMingleResponse()
	return res.Past + res.Confirmed
}

const findPopularKeywordIntent = "FindPopularKeywordIntent"

const countBrainDatesIntent = "CountBrainDatesIntent"

const AmazonHelp = "AMAZON.HelpIntent"

func buildOutput(intent *AlexaIntent) string {
	var speech string
	if intent.Name == findPopularKeywordIntent {
		keywords := getKeywords()
		speech = "The most popular keywords were: " + strings.Join(keywords, " , ")
	} else if intent.Name == countBrainDatesIntent {
		brainDates := getBraindates()
		speech = fmt.Sprintf("We've had a total of %d mingles so far", brainDates)
	} else if intent.Name == AmazonHelp {
                speech = "You can say: what was the most popular keyword. And how many mingles have we had?"
        } else {
		speech = fmt.Sprintf("You wanted the %s intent, but I can't help you with that.", intent.Name)
	}
	return speech
}

func handle(header http.Header, body []byte) {
	var req AlexaReq
	err := json.Unmarshal(body, &req)
	if err != nil {
		fmt.Println(err)
		return
	}

	if req.Request != nil && req.Request.Intent != nil && len(req.Request.Intent.Name) > 0 {
		res := AlexaRes{}
		res.Response = &AlexaResponse{}
		res.Version = "1.0"
		res.SessionAttributes = map[string]string{}
		res.Response.ShouldEndSession = true
		speech := buildOutput(req.Request.Intent)
		res.Response.OutputSpeech = &AlexaOutputSpeech{Type: "PlainText", Text: speech}
		out, err := json.Marshal(&res)
		if err != nil {
			fmt.Println(err)
		} else {
			fmt.Println(string(out))
		}
	}
}
