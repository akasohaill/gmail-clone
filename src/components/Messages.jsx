import React, { useEffect, useState } from 'react';
import Message from './Message';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setEmails } from '../redux/appSlice';

const Messages = () => {
  const { emails, searchText } = useSelector((store) => store.appSlice);
  const [tempEmail, setTempEmail] = useState(emails);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allemails = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(setEmails(allemails));
    });

    // Cleanup
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const filterEmail = emails?.filter((email) => {
      const emailSubject = email.subject ? email.subject.toLowerCase() : '';
      const emailTo = email.to ? email.to.toLowerCase() : '';
      const emailMessage = email.message ? email.message.toLowerCase() : '';
      const search = searchText ? searchText.toLowerCase() : '';

      return (
        emailSubject.includes(search) ||
        emailTo.includes(search) ||
        emailMessage.includes(search)
      );
    });
    setTempEmail(filterEmail);
  }, [searchText, emails]);

  return (
    <div>
      {
        tempEmail && tempEmail.map((email) => <Message key={email.id} email={email} />)
      }
    </div>
  );
};

export default Messages;
