<!-- eslint-disable vue/multi-word-component-names -->
coursesRef.get().then(function(snapshot) {
    vat courses = [];
    snapshot.forEach(function(childSnapshot) {
      var id = childSnapshot.id;
      var data = childSnapshot.val();
      // ...
      courses.push({ id: id, name: data.name, description: data.description, dept: data.dept, courseNumber: data.courseNumber, level: data.level, hours: data.hours});
    });
  });