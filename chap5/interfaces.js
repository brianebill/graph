Interfaces are another option when dealing with multiple object types that could be returned by a single field. An interface is an abstract type that establishes a list of fields that should be implemented in similar object types. When another type implements the interface, it includes all of the fields from the interface and usually some of its own fields.

query schedule {
  agenda {
    name
    start
    end
  }
}

The schedule query doesn’t seem to care that the agenda field returns multiple types. It needs only the name, start, and end times for the item in order to create the schedule of when and where this student should be. When querying an interface, we can also use fragments to select additional fields when a specific object type is returned:

query schedule {
  agenda {
    name
    start
    end
    ... on Workout {
      reps
    }
  }
}

The schedule query has been modified to additionally request the reps when the ScheduleItem is a Workout.
