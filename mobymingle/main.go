package main

import (
	"github.com/alexellis/faas/watchdog/types"
	"io/ioutil"
	"log"
	"os"
)

func main() {
	bytesIn, _ := ioutil.ReadAll(os.Stdin)
	req, err := types.UnmarshalRequest(bytesIn)
	if err != nil {
		log.Fatal(err)
	}
	handle(req.Header, bytesIn) //req.Body.Raw)
}
