var StateEnum = 
{
  InitializeData: 0,
  CreateTopics: 1,
  SelectTopics: 2,
  ReSelectTopics: 3,
  DetermineGroups: 4,
  Scoring: 5
}
var CurrentState = StateEnum.Scoring

exports.StateEnum = StateEnum
exports.CurrentState = CurrentState

