Meteor.publish('modules', function(PUField, regionField, search) {
  check(search, Match.OneOf(String, null, undefined));
  check(regionField, Match.OneOf(String, null, undefined));
  check(PUField, Match.OneOf(String, null, undefined));

  let query = {};
  let projection = { limit: 10, sort: { PrevMatch: -1, Similarity: -1}};  //sort in descending order according to Similarity field
  if (search) {
    let regex = new RegExp(search, 'i');

    if (!!PUField){
      query["PUModuleCode"] = PUField;
    }

    if (!!regionField){
      query["Region"] = regionField;
    }

    query["NUSModuleCode"] = regex;

    projection.limit = 100;
  }

  return Modules.find(query, projection);
});
