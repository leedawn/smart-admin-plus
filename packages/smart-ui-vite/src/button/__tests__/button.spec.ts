import { describe, expect, test } from "vitest";
import { shallowMount } from "@vue/test-utils";
import Button from "../button";

describe("button", () => {
  test("mount", () => {
    const wrapper = shallowMount(Button, {
      slots: { default: "Button" },
    });
    expect(wrapper.text()).toBe("Button");
  });
});

describe("color", () => {
  test("default", () => {
    const wrapper = shallowMount(Button);
    expect(wrapper.classes().includes("bg-blue-500")).toBe(true);
  });
});
