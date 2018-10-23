A GraphQL query document can contain definitions for operations and fragments. Fragments are selection sets that can be reused in multiple operations.

fragment liftInfo on Lift {
  name
  status
  capacity
  night
  elevationGain
}

query {
  Lift( id: "jazz-cat") {
    ... liftInfo
    trailAccess {
      name
      difficulty
    }
  }
  Trail( id: "river-run") {
    name
    difficulty
    accessedByLifts {
      ... liftInfo
    }
  }
}

We’ve already looked at how to return lists of objects, but in each case so far, we’ve returned lists of a single type. If you wanted a list to return more than one type, you could create a union type, which creates an association between two different object types.

When writing a query for a student’s agenda, you can use fragments to define which fields to select when the AgendaItem is a Workout, and which fields to select when the AgendaItem is a StudyGroup:

query schedule {
  agenda {
    ... on Workout {
      name
      reps
    }
    ... on StudyGroup {
      name
      subject
      students
    }
  }
}

Here, we are using inline fragments. Inline fragments do not have names. They assign selection sets to define which fields to select when a union returns different types of objects. For each Workout, this query asks for the names and the reps in the returned Workout object. For each study group, we ask for the name, subject, and students in the returned StudyGroup object. The returned agenda will consist of a single array that contains different types of objects.


You can also use named fragments to query a union type:
query today {
  agenda {
    ... workout
    ... study
  }
}

fragment workout on Workout {
  name
  reps
}

fragment study on StudyGroup {
  name
  subject
  students
}
