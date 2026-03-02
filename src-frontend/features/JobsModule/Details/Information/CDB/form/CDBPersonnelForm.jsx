import { FormGroup, Input, Label } from "reactstrap";
import { FormWrapper } from "../../common/FormWrapper";

export function CDBPersonnelForm({
  name,
  position,
  linkedin,
  email,
  mobile_number,
  updateFields,
}) {
  return (
    <FormWrapper>
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(e) => updateFields("name", e.target.value)}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label>Position</Label>
        <Input
          type="text"
          name="position"
          value={position}
          onChange={(e) => updateFields("position", e.target.value)}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label>Linked In</Label>
        <Input
          type="text"
          name="linkedin"
          value={linkedin}
          onChange={(e) => updateFields("linkedin", e.target.value)}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => updateFields("email", e.target.value)}
          placeholder="mark.kearney@email.com"
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label>Mobile Number</Label>
        <Input
          type="text"
          name="mobile_number"
          value={mobile_number}
          onChange={(e) => updateFields("mobile_number", e.target.value)}
          placeholder="Mobile number..."
        ></Input>
      </FormGroup>
    </FormWrapper>
  );
}
