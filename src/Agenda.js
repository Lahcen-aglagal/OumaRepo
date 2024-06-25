import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Modal } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the Calendar CSS
import './Agenda.css'; // Import the custom CSS

function Agenda() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, title: "Meeting with Client", description: "Discuss project requirements with the client.", date: "2024-07-10", urgent: false },
    { id: 2, title: "Team Standup", description: "Daily standup meeting with the development team.", date: "2024-07-12", urgent: false },
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New event added: Meeting with Client.", date: "2024-07-01" },
    { id: 2, message: "Reminder: Team Standup tomorrow.", date: "2024-07-11" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', urgent: false });
  const [editEventId, setEditEventId] = useState(null);

  const handleAddEvent = () => {
    const updatedEvents = [
      ...events,
      { ...newEvent, id: events.length + 1, date: date.toISOString().split('T')[0] }
    ];
    setEvents(updatedEvents);
    setNotifications([
      ...notifications,
      {
        id: notifications.length + 1,
        message: `New event added: ${newEvent.title}.`,
        date: new Date().toISOString().split('T')[0]
      }
    ]);
    setNewEvent({ title: '', description: '', date: '', urgent: false });
    setShowModal(false);
  };

  const handleEditEvent = (event) => {
    setEditEventId(event.id);
    setNewEvent(event);
    setShowModal(true);
  };

  const handleUpdateEvent = () => {
    const updatedEvents = events.map(event => event.id === editEventId ? newEvent : event);
    setEvents(updatedEvents);
    setNotifications([
      ...notifications,
      {
        id: notifications.length + 1,
        message: `Event updated: ${newEvent.title}.`,
        date: new Date().toISOString().split('T')[0]
      }
    ]);
    setNewEvent({ title: '', description: '', date: '', urgent: false });
    setEditEventId(null);
    setShowModal(false);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    setNotifications([
      ...notifications,
      {
        id: notifications.length + 1,
        message: `Event deleted.`,
        date: new Date().toISOString().split('T')[0]
      }
    ]);
  };

  const handleModalClose = () => {
    setNewEvent({ title: '', description: '', date: '', urgent: false });
    setEditEventId(null);
    setShowModal(false);
  };

  return (
    <Container className="agenda-container">
      <h1 className="mb-4">Agenda</h1>
      <Row>
        <Col md={6}>
          <Card className="agenda-card mb-4">
            <Card.Body>
              <Card.Title>Calendar</Card.Title>
              <Calendar onChange={setDate} value={date} />
            </Card.Body>
          </Card>
          <Card className="agenda-card">
            <Card.Body>
              <Card.Title>Add/Edit Event</Card.Title>
              <Button className="btn-add-event" onClick={() => setShowModal(true)}>
                Add New Event
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="agenda-card mb-4 upcoming-events">
            <Card.Body>
              <Card.Title>Upcoming Events</Card.Title>
              {events.map(event => (
                <Card key={event.id} className={`upcoming-event-card mb-2 ${event.urgent ? 'urgent-event' : ''}`}>
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <Card.Text><small className="text-muted">Date: {event.date}</small></Card.Text>
                    <Button className="btn-edit-event" onClick={() => handleEditEvent(event)}>Edit</Button>
                    <Button className="btn-delete-event" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
          <Card className="agenda-card">
            <Card.Body>
              <Card.Title>Notification Journal</Card.Title>
              <ListGroup variant="flush">
                {notifications.map(notification => (
                  <ListGroup.Item key={notification.id} className="notification-list-group-item">
                    <p className="mb-1">{notification.message}</p>
                    <small className="text-muted">Date: {notification.date}</small>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editEventId ? 'Edit Event' : 'Add New Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEventTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEventDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEventDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEventUrgent">
              <Form.Check
                type="checkbox"
                label="Urgent"
                checked={newEvent.urgent}
                onChange={(e) => setNewEvent({ ...newEvent, urgent: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            className="btn-add-event"
            onClick={editEventId ? handleUpdateEvent : handleAddEvent}
          >
            {editEventId ? 'Update Event' : 'Add Event'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Agenda;
