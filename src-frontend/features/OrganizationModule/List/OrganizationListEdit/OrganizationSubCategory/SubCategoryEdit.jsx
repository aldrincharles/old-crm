import React, { useState } from "react";

import { Button, Label, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";

import { BootstrapModal, AsyncSelectWrap } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";

export const SubCategoryEdit = ({ data, url, onSubmit = () => null }) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button color="primary" onClick={toggle} className="my-2">
        <i className="ion-edit" />
      </Button>
      <ComponentDialogue
        data={data}
        onSubmit={onSubmit}
        url={url}
        visible={visible}
        toggle={toggle}
      />
    </>
  );
};

const ComponentDialogue = React.memo(
  ({ data, url, onSubmit, visible, toggle }) => {
    const authAxios = useAxiosPrivate();
    const { formData, handleOnChange, handleSubmit } = useCustomForm(
      { subcategories: data?.subcategories },
      (e) => handleOnSubmit(e)
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleOnSubmit = async (data) => {
      setIsLoading(true);
      let response = authAxios.post(url, {
        ...data,
      });

      try {
        response = await toast.promise(response, {
          pending: {
            render() {
              return "Pending";
            },
          },
          success: {
            render({ data }) {
              const message = data.data?.message;
              return `${message} 👌`;
            },
          },
          error: {
            render() {
              return "Oops! Something went wrong 🤯";
            },
          },
        });
        const result = response.data;
        onSubmit(result.content);
        toggle();
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
        <BootstrapModal.Body>
          <Form id="subcategoryform" onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Subcategories</Label>
              <AsyncSelectWrap
                name="subcategories"
                value={formData.subcategories}
                dependencies={{
                  url: "/parameters",
                  topic: "subcategory",
                }}
                onChange={(e) => handleOnChange("subcategories", e)}
                isClearable
                isMulti
              />
            </FormGroup>
          </Form>

          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={isLoading}
            type="submit"
            form="subcategoryform"
            color="success"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    );
  }
);
