import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// smoke test
it("renders without crashing", function () {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // move to the sescond image before we can click on the left arrow to go back to the first image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  // return to the first image by clicking the left arrow
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);
  // expect the first image to show, but not the third
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).not.toBeInTheDocument();
});

it("should not have the left arrow when the first image is shown", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).not.toBeInTheDocument();

  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  // but if the photo on the screen is not the first one, the left arrow appears
  expect(container.querySelector(".bi-arrow-left-circle")).toBeInTheDocument();
});

it("should not have the right arrow when the last image is shown", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).not.toBeInTheDocument();
});
