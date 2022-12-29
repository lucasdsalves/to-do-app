import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  firestoreCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.firestoreCollection = firestore.collection('toDos');
  }

  addToDo(task: string) {
    this.firestoreCollection.add({
      task,
      isDone: false,
    });
  }

  updateToDoStatus(id: string, newStatus: boolean) {
    this.firestoreCollection.doc(id).update({ isDone: newStatus });
  }

  deleteToDo(id: string) {
    this.firestoreCollection.doc(id).delete();
  }
}
