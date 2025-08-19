import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./InputField";

describe("InputField", () => {
  it("renders with label and placeholder", () => {
    render(<InputField label="Username" placeholder="Enter username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  it("shows helper text when valid", () => {
    render(
      <InputField
        label="Email"
        placeholder="Enter email"
        helperText="We will never share your email"
      />
    );
    expect(screen.getByText("We will never share your email")).toBeInTheDocument();
  });

  it("hides helper text if invalid", () => {
    render(
      <InputField
        label="Email"
        helperText="We will never share your email"
        invalid
        errorMessage="Invalid email"
      />
    );
    expect(screen.queryByText("We will never share your email")).toBeNull();
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("displays error message when invalid", () => {
    render(
      <InputField label="Password" invalid errorMessage="Password is too short" />
    );
    expect(screen.getByText("Password is too short")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toHaveAttribute("aria-invalid", "true");
  });

  it("accepts typed input", () => {
    render(<InputField label="Name" placeholder="Enter name" />);
    const input = screen.getByPlaceholderText("Enter name") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "John" } });
    expect(input.value).toBe("John");
  });

  it("clear button clears value", () => {
    const handleChange = jest.fn();
    render(
      <InputField label="Search" value="Hello" onChange={handleChange} clearable />
    );

    const clearBtn = screen.getByRole("button", { name: /clear input/i });
    fireEvent.click(clearBtn);

    expect(handleChange).toHaveBeenCalled();
    const callArg = handleChange.mock.calls[0][0];
    expect(callArg.target.value).toBe("");
  });

  it("password toggle switches type", () => {
    render(<InputField label="Password" placeholder="Enter password" type="password" />);
    const input = screen.getByPlaceholderText("Enter password") as HTMLInputElement;

    expect(input.type).toBe("password"); // default

    const toggleBtn = screen.getByRole("button", { name: /show password/i });
    fireEvent.click(toggleBtn);
    expect(input.type).toBe("text");

    fireEvent.click(toggleBtn);
    expect(input.type).toBe("password");
  });

  it("shows loading spinner when loading", () => {
    render(<InputField label="Loading Field" loading />);
    const spinner = screen.getByRole("status", { name: /loading/i });
    expect(spinner).toBeInTheDocument();
  });
});
