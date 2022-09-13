tutorialsRef.get().then(function(snapshot) {
    vat tutorials = [];
    snapshot.forEach(function(childSnapshot) {
      var id = childSnapshot.id;
      var data = childSnapshot.val();
      // ...
      tutorials.push({ id: id, title: data.title, description: data.description});
    });
  });