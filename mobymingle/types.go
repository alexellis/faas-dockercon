package main

type BraindateTopicResponse struct {
	Braindates BraindateKeyword `json:"braindates"`
	Content    BraindateKeyword `json:"content"`
}

type BraindateKeyword struct {
	Label string `json:"label"`
	Count int    `json:"count"`
}

type BraindateResponse struct {
	Pending   int `json:"pending"`
	Confirmed int `json:"confirmed"`
	Past      int `json:"past"`
	Upcoming  int `json:"upcoming"`
	Current   int `json:"current"`
}

type AlexaResponse struct {
	OutputSpeech     *AlexaOutputSpeech `json:"outputSpeech"`
	ShouldEndSession bool               `json:"shouldEndSession"`
}

type AlexaOutputSpeech struct {
	Type string `json:"type"`
	Text string `json:"text"`
}

type AlexaRes struct {
	Response          *AlexaResponse `json:"response"`
	Version           string         `json:"version"`
	SessionAttributes interface{}    `json:"sessionAttributes"`
}

type AlexaIntent struct {
	Name string `json:"name"`
}

type AlexaRequest struct {
	Intent *AlexaIntent `json:"intent"`
}

type AlexaReq struct {
	ApplicationId string        `json:"applicationId"`
	Request       *AlexaRequest `json:"request"`
}
