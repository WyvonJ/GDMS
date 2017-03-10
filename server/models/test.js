
var state = require('../state')

if(state.CurrentState == state.StateEnum.InitializeData)
console.log("InitializeData")
if(state.CurrentState == state.StateEnum.CreateTopics)
console.log("CreateTopics")
if(state.CurrentState == state.StateEnum.SelectTopics)
console.log("SelectTopics")
if(state.CurrentState == state.StateEnum.ReSelectTopics)
console.log("ReSelectTopics")


state.CurrentState = state.StateEnum.CreateTopics

if(state.CurrentState == state.StateEnum.DetermineGroups)
console.log("DetermineGroups")
if(state.CurrentState == state.StateEnum.Scoring)
console.log("Scoring")