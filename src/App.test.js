import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => render(<App />));

test("renders user data", () => {
  const users = screen.getAllByTestId("user-data");
  expect(users.length).toBe(4);
})

test("renders create button", () => {
  const createUserButton = screen.getByText(/create user/i);
  expect(createUserButton).toBeInTheDocument();
})

test("enters create mode", () => {
  const createUserButton = screen.getByText(/create user/i);

  fireEvent.click(
    createUserButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  // Verify if modal displayed
  const modalTitle = screen.getByTestId("modal-title");
  expect(modalTitle).toBeInTheDocument();
  expect(modalTitle.innerHTML).toBe("Create User")
})

test("create mode should have all default fields", () => {
  const createUserButton = screen.getByText(/create user/i);

  fireEvent.click(
    createUserButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  // Verify modal fileds
  let nameInput = screen.getByTestId("name");
  expect(nameInput).toBeInTheDocument();
  expect(nameInput.value).toBe("");

  let emailInput = screen.getByTestId("email");
  expect(emailInput).toBeInTheDocument();
  expect(emailInput.value).toBe("");

  let roleSelect = screen.getByTestId("role");
  expect(roleSelect).toBeInTheDocument();
  expect(roleSelect.value).toBe("User");
})

test("create new user", () => {
  const createUserButton = screen.getByText(/create user/i);

  fireEvent.click(
    createUserButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  // Number of users before creation of new user
  expect(screen.getAllByTestId("user-data").length).toBe(4);

  // Adding data to fields
  let nameInput = screen.getByTestId("name");
  fireEvent.change(nameInput, { target: { value: 'test' }});
  expect(nameInput.value).toBe("test");

  let emailInput = screen.getByTestId("email");
  fireEvent.change(emailInput, { target: { value: 'test@gmail.com' }});
  expect(emailInput.value).toBe("test@gmail.com");

  let roleSelect = screen.getByTestId("role");
  fireEvent.change(roleSelect, { target: { value: 'Admin' }});
  expect(roleSelect.value).toBe("Admin");

  // Submitting the user data
  let createUserModalButton = screen.getByTestId("create-user-modal");
  expect(createUserModalButton).toBeInTheDocument();
  fireEvent.click(createUserModalButton, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));
  
  // Number of users after creation of new user
  expect(screen.getAllByTestId("user-data").length).toBe(5);
})

test('edit functionality', () => {
  const editButtons = screen.getAllByTestId("edit");
  expect(editButtons.length).toBe(4);

  fireEvent.click(editButtons[0], new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));

  // Editing data after clicking edit
  let nameInput = screen.getByTestId("name");
  fireEvent.change(nameInput, { target: { value: 'John' }});
  expect(nameInput.value).toBe("John");

  let emailInput = screen.getByTestId("email");
  fireEvent.change(emailInput, { target: { value: 'john@gmail.com' }});
  expect(emailInput.value).toBe("john@gmail.com");

  let roleSelect = screen.getByTestId("role");
  fireEvent.change(roleSelect, { target: { value: 'Admin' }});
  expect(roleSelect.value).toBe("Admin");

  // Saving edited data
  let updateUserModalButton = screen.getByTestId("update-user-modal");
  expect(updateUserModalButton).toBeInTheDocument();
  fireEvent.click(updateUserModalButton, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));

  fireEvent.click(screen.getAllByTestId("edit")[3], new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));

  // Verifying data after editing
  nameInput = screen.getByTestId("name");
  expect(nameInput.value).toBe("John");

  emailInput = screen.getByTestId("email");
  expect(emailInput.value).toBe("john@gmail.com");

  roleSelect = screen.getByTestId("role");
  expect(roleSelect.value).toBe("Admin");

});

test("delete functionality", () => {
  const deleteButtons = screen.getAllByTestId("delete");

  // Before deletion
  expect(deleteButtons.length).toBe(4);

  fireEvent.click(deleteButtons[3], new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));

  // After deletion
  expect(screen.getAllByTestId("delete").length).toBe(3);
})
