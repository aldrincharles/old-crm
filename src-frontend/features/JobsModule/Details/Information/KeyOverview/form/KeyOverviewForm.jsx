import { FormGroup, Input, Label } from "reactstrap";
import { FormWrapper } from "../../common/FormWrapper";

export function KeyOverviewForm({
  company_overview,
  why_change,
  target_compensation,
  size_team,
  position_overview,
  experience,
  key_attributes,
  personality,
  vertical_specialization,
  commission_targets,
  updateFields,
}) {
  return (
    <FormWrapper>
      <FormGroup>
        <Label>Company Overview</Label>
        <Input
          type="textarea"
          name="company_overview"
          value={company_overview}
          onChange={(e) => updateFields("company_overview", e.target.value)}
          placeholder="Write here..."
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label>Why making the change?</Label>
        <Input
          type="textarea"
          name="why_change"
          value={why_change}
          onChange={(e) => updateFields("why_change", e.target.value)}
          placeholder="Write here..."
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label>Target Compensation</Label>
        <Input
          type="textarea"
          name="target_compensation"
          value={target_compensation}
          onChange={(e) => updateFields("target_compensation", e.target.value)}
          placeholder="Write here..."
        ></Input>
      </FormGroup>

      <FormGroup>
        <Label>Size of Current Team</Label>
        <Input
          type="textarea"
          name="size_team"
          value={size_team}
          onChange={(e) => updateFields("size_team", e.target.value)}
          placeholder="Write here..."
        ></Input>
      </FormGroup>

      <FormGroup>
        <Label>Pitch/Overview of the Role</Label>
        <Input
          type="textarea"
          name="position_overview"
          value={position_overview}
          onChange={(e) => updateFields("position_overview", e.target.value)}
          placeholder="Write here..."
        ></Input>
      </FormGroup>

      <FormGroup>
        <Label>Experience</Label>
        <Input
          type="textarea"
          name="experience"
          value={experience}
          onChange={(e) => updateFields("experience", e.target.value)}
          placeholder="Write here..."
        ></Input>
      </FormGroup>

      <FormGroup>
        <Label>Key Attributes</Label>
        <Input
          type="textarea"
          name="key_attributes"
          value={key_attributes}
          onChange={(e) => updateFields("key_attributes", e.target.value)}
          placeholder="Write here..."
        ></Input>
      </FormGroup>

      <FormGroup>
        <Label>Personality</Label>
        <Input
          type="textarea"
          name="personality"
          value={personality}
          onChange={(e) => updateFields("personality", e.target.value)}
          placeholder="Write here..."
        ></Input>
      </FormGroup>

      <FormGroup>
        <Label>Vertical</Label>
        <Input
          type="textarea"
          name="vertical_specialization"
          value={vertical_specialization}
          onChange={(e) =>
            updateFields("vertical_specialization", e.target.value)
          }
          placeholder="Write here..."
        ></Input>
      </FormGroup>

      <FormGroup>
        <Label>Commission Targets</Label>
        <Input
          type="textarea"
          name="commission_targets"
          value={commission_targets}
          onChange={(e) => updateFields("commission_targets", e.target.value)}
          placeholder="Write here..."
        ></Input>
      </FormGroup>
    </FormWrapper>
  );
}
