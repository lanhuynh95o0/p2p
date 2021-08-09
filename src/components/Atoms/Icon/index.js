import React from 'react';
import AntIcon from '@ant-design/icons';

import './styles.scss';

const Icon = ({ component, ...rest }) => {
  return <AntIcon component={component} {...rest} />;
};

Icon.propTypes = {};

export default Icon;

export const IconCustom = {
  Edit: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-72.000000, -216.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Edit"
            transform="translate(72.000000, 216.000000)"
          >
            <path
              d="M14.06,6.1925 L17.81,9.9425 L6.75,21.0025 L3,21.0025 L3,17.2525 L14.06,6.1925 Z M14.06,9.0215 L5,18.0815 L5,19.0025 L5.921,19.0025 L14.981,9.9425 L14.06,9.0215 Z M16.96,3.2925 C17.35,2.9025 17.98,2.9025 18.37,3.2925 L18.37,3.2925 L20.71,5.6325 C21.1,6.0225 21.1,6.6525 20.71,7.0425 L20.71,7.0425 L18.88,8.8725 L15.13,5.1225 Z"
              id="Combined-Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Plus: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-72.000000, -24.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Add-/-Cirle"
            transform="translate(72.000000, 24.000000)"
          >
            <path
              d="M13,7 L11,7 L11,11 L7,11 L7,13 L11,13 L11,17 L13,17 L13,13 L17,13 L17,11 L13,11 L13,7 L13,7 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 L12,20 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Close: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-24.000000, -168.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Close"
            transform="translate(24.000000, 168.000000)"
          >
            <polygon
              id="Shape"
              points="19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12"
            ></polygon>
          </g>
        </g>
      </g>
    </svg>
  ),
  Checked: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-72.000000, -120.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Checked-/-Default"
            transform="translate(72.000000, 120.000000)"
          >
            <polygon
              id="Shape"
              points="9 16.17 4.83 12 3.41 13.41 9 19 21 7 19.59 5.59"
            ></polygon>
          </g>
        </g>
      </g>
    </svg>
  ),
  ViewModule: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-120.000000, -552.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-View-/-Module"
            transform="translate(120.000000, 552.000000)"
          >
            <path
              d="M6,11 L11,11 L11,5 L6,5 L6,11 L6,11 Z M6,19 L11,19 L11,13 L6,13 L6,19 L6,19 Z M13,19 L18,19 L18,13 L13,13 L13,19 L13,19 Z M13,11 L18,11 L18,5 L13,5 L13,11 L13,11 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  ViewList: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-72.000000, -552.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-View-/-List"
            transform="translate(72.000000, 552.000000)"
          >
            <path
              d="M4,14 L8,14 L8,10 L4,10 L4,14 L4,14 Z M4,19 L8,19 L8,15 L4,15 L4,19 L4,19 Z M4,9 L8,9 L8,5 L4,5 L4,9 L4,9 Z M9,14 L21,14 L21,10 L9,10 L9,14 L9,14 Z M9,19 L21,19 L21,15 L9,15 L9,19 L9,19 Z M9,5 L9,9 L21,9 L21,5 L9,5 L9,5 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Trash: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-168.000000, -168.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Delete"
            transform="translate(168.000000, 168.000000)"
          >
            <path
              d="M18,7 L18,19 C18,20.1045695 17.1045695,21 16,21 L8,21 C6.8954305,21 6,20.1045695 6,19 L6,7 L18,7 Z M16,9 L8,9 L8,19 L16,19 L16,9 Z M14.5,3 L15.5,4 L19,4 L19,6 L5,6 L5,4 L8.5,4 L9.5,3 L14.5,3 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Search: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-72.000000, -456.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Search"
            transform="translate(72.000000, 456.000000)"
          >
            <path
              d="M10,3 C13.8659932,3 17,6.13400675 17,10 C17,11.4433213 16.5631787,12.7846175 15.8145283,13.8988966 L20.8890873,18.9748737 L19.4748737,20.3890873 L14.47082,15.3864939 C13.2581853,16.3941027 11.6998501,17 10,17 C6.13400675,17 3,13.8659932 3,10 C3,6.13400675 6.13400675,3 10,3 Z M10,5 C7.23857625,5 5,7.23857625 5,10 C5,12.7614237 7.23857625,15 10,15 C12.7614237,15 15,12.7614237 15,10 C15,7.23857625 12.7614237,5 10,5 Z"
              id="Combined-Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Home: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-24.000000, -312.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Home"
            transform="translate(24.000000, 312.000000)"
          >
            <path
              d="M12,2 L21,9 L21,22 L13,22 L13,17 C13,16.4477153 12.5522847,16 12,16 C11.4871642,16 11.0644928,16.3860402 11.0067277,16.8833789 L11,17 L11,22 L3,22 L3,9 L12,2 Z M12,4.533 L5,9.977 L5,20 L9,20 L9,17 L9.00331971,16.8848139 L9.01004744,16.7681928 L9.02008321,16.6526332 C9.19512057,15.1456188 10.4729741,14 12,14 C13.5976809,14 14.9036609,15.24892 14.9949073,16.8237272 L15,17 L15,20 L19,20 L19,9.978 L12,4.533 Z"
              id="Combined-Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Folder: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">

      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-24.000000, -264.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Folder-/-Default"
            transform="translate(24.000000, 264.000000)"
          >
            <path
              d="M20,6 L12,6 L10,4 L4,4 C2.9,4 2.01,4.9 2.01,6 L2,18 C2,19.1 2.9,20 4,20 L20,20 C21.1,20 22,19.1 22,18 L22,8 C22,6.9 21.1,6 20,6 L20,6 Z M20,18 L4,18 L4,8 L20,8 L20,18 L20,18 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  UserCommunity: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">

      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-216.000000, -504.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-User-/-Community"
            transform="translate(216.000000, 504.000000)"
          >
            <path
              d="M9,13.75 C6.66,13.75 2,14.92 2,17.25 L2,19 L16,19 L16,17.25 C16,14.92 11.34,13.75 9,13.75 Z M4.34,17 C5.18,16.42 7.21,15.75 9,15.75 C10.79,15.75 12.82,16.42 13.66,17 L4.34,17 Z M9,12 C10.93,12 12.5,10.43 12.5,8.5 C12.5,6.57 10.93,5 9,5 C7.07,5 5.5,6.57 5.5,8.5 C5.5,10.43 7.07,12 9,12 Z M9,7 C9.83,7 10.5,7.67 10.5,8.5 C10.5,9.33 9.83,10 9,10 C8.17,10 7.5,9.33 7.5,8.5 C7.5,7.67 8.17,7 9,7 Z M16.04,13.81 C17.2,14.65 18,15.77 18,17.25 L18,19 L22,19 L22,17.25 C22,15.23 18.5,14.08 16.04,13.81 L16.04,13.81 Z M15,12 C16.93,12 18.5,10.43 18.5,8.5 C18.5,6.57 16.93,5 15,5 C14.46,5 13.96,5.13 13.5,5.35 C14.13,6.24 14.5,7.33 14.5,8.5 C14.5,9.67 14.13,10.76 13.5,11.65 C13.96,11.87 14.46,12 15,12 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Contact: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">

      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-72.000000, -168.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Contact"
            transform="translate(72.000000, 168.000000)"
          >
            <path
              d="M19,2 C20.1045695,2 21,2.8954305 21,4 L21,20 C21,21.1045695 20.1045695,22 19,22 L7,22 C5.8954305,22 5,21.1045695 5,20 L5,18 L4,18 C3.44771525,18 3,17.5522847 3,17 C3,16.4477153 3.44771525,16 4,16 L5,16 L5,13 L4,13 C3.44771525,13 3,12.5522847 3,12 C3,11.4477153 3.44771525,11 4,11 L5,11 L5,8 L4,8 C3.44771525,8 3,7.55228475 3,7 C3,6.44771525 3.44771525,6 4,6 L5,6 L5,4 C5,2.8954305 5.8954305,2 7,2 L19,2 Z M19,4 L7,4 L7,6 C7.55228475,6 8,6.44771525 8,7 C8,7.55228475 7.55228475,8 7,8 L7,11 C7.55228475,11 8,11.4477153 8,12 C8,12.5522847 7.55228475,13 7,13 L7,16 C7.55228475,16 8,16.4477153 8,17 C8,17.5522847 7.55228475,18 7,18 L7,20 L19,20 L19,4 Z M13,13 C14.335,13 17,13.67 17,15 L17,15 L17,16 L9,16 L9,15 C9,13.67 11.665,13 13,13 Z M13,8 C14.105,8 15,8.895 15,10 C15,11.105 14.105,12 13,12 C11.895,12 11,11.105 11,10 C11,8.895 11.895,8 13,8 Z"
              id="Combined-Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Document: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">

      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-216.000000, -168.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Document"
            transform="translate(216.000000, 168.000000)"
          >
            <path
              d="M15,2 L19.926,7 L20,7 L20,20 C20,21.1045695 19.1045695,22 18,22 L6,22 C4.8954305,22 4,21.1045695 4,20 L4,4 C4,2.8954305 4.8954305,2 6,2 L15,2 Z M13,4 L6,4 L6,20 L18,20 L18,9 L15,9 C13.7950151,9 13.0872562,8.18269699 13,7 L13,4 Z M15.5,16 C15.7761424,16 16,16.2238576 16,16.5 L16,17.5 C16,17.7761424 15.7761424,18 15.5,18 L8.5,18 C8.22385763,18 8,17.7761424 8,17.5 L8,16.5 C8,16.2238576 8.22385763,16 8.5,16 L15.5,16 Z M15.5,13 C15.7761424,13 16,13.2238576 16,13.5 L16,14.5 C16,14.7761424 15.7761424,15 15.5,15 L8.5,15 C8.22385763,15 8,14.7761424 8,14.5 L8,13.5 C8,13.2238576 8.22385763,13 8.5,13 L15.5,13 Z M15,4.849 L15,7 L17.119,7 L15,4.849 Z"
              id="Combined-Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Bookmark: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">

      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-24.000000, -72.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Bookmark"
            transform="translate(24.000000, 72.000000)"
          >
            <path
              d="M17,3 L7,3 C5.9,3 5.01,3.9 5.01,5 L5,21 L12,18 L19,21 L19,5 C19,3.9 18.1,3 17,3 L17,3 Z M17,18 L12,15.82 L7,18 L7,5 L17,5 L17,18 L17,18 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Assessment: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">

      <g
        id="07.-Design-Guideline"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Guideline_Icons" transform="translate(-796.000000, -313.000000)">
          <g
            id="Icons-/-Basic-/-Line-/-Assessment"
            transform="translate(796.000000, 313.000000)"
          >
            <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
            <path
              d="M19,3 L5,3 C3.9,3 3,3.9 3,5 L3,19 C3,20.1 3.9,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,5 C21,3.9 20.1,3 19,3 Z M19,19 L5,19 L5,5 L19,5 L19,19 Z M7,10 L9,10 L9,17 L7,17 L7,10 Z M11,7 L13,7 L13,17 L11,17 L11,7 Z M15,13 L17,13 L17,17 L15,17 L15,13 Z"
              id="Shape"
              fill="currentColor"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  ChervonRight: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">

      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-216.000000, -120.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Chervon-/-Right"
            transform="translate(216.000000, 120.000000)"
          >
            <polygon
              id="Shape"
              points="10 6 8.59 7.41 13.17 12 8.59 16.59 10 18 16 12"
            ></polygon>
          </g>
        </g>
      </g>
    </svg>
  ),
  ChervonLeft: () => (
    <svg width="1em" height="1em">

      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-168.000000, -120.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Chervon-/-Left"
            transform="translate(168.000000, 120.000000)"
          >
            <polygon
              id="Shape"
              points="15.41 7.41 14 6 8 12 14 18 15.41 16.59 10.83 12"
            ></polygon>
          </g>
        </g>
      </g>
    </svg>
  ),

  MoreHorizontal: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">

      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-24.000000, -408.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-More-/-Horizontal"
            transform="translate(24.000000, 408.000000)"
          >
            <path
              d="M6,10 C4.9,10 4,10.9 4,12 C4,13.1 4.9,14 6,14 C7.1,14 8,13.1 8,12 C8,10.9 7.1,10 6,10 L6,10 Z M18,10 C16.9,10 16,10.9 16,12 C16,13.1 16.9,14 18,14 C19.1,14 20,13.1 20,12 C20,10.9 19.1,10 18,10 L18,10 Z M12,10 C10.9,10 10,10.9 10,12 C10,13.1 10.9,14 12,14 C13.1,14 14,13.1 14,12 C14,10.9 13.1,10 12,10 L12,10 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Mail: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">

      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-72.000000, -360.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Mail"
            transform="translate(72.000000, 360.000000)"
          >
            <path
              d="M20,4 L4,4 C2.9,4 2.01,4.9 2.01,6 L2,18 C2,19.1 2.9,20 4,20 L20,20 C21.1,20 22,19.1 22,18 L22,6 C22,4.9 21.1,4 20,4 L20,4 Z M20,18 L4,18 L4,8 L12,13 L20,8 L20,18 L20,18 Z M12,11 L4,6 L20,6 L12,11 L12,11 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Calendar: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">

      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-216.000000, -72.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Calendar"
            transform="translate(216.000000, 72.000000)"
          >
            <path
              d="M9,11 L7,11 L7,13 L9,13 L9,11 L9,11 Z M13,11 L11,11 L11,13 L13,13 L13,11 L13,11 Z M17,11 L15,11 L15,13 L17,13 L17,11 L17,11 Z M19,4 L18,4 L18,2 L16,2 L16,4 L8,4 L8,2 L6,2 L6,4 L5,4 C3.89,4 3.01,4.9 3.01,6 L3,20 C3,21.1 3.89,22 5,22 L19,22 C20.1,22 21,21.1 21,20 L21,6 C21,4.9 20.1,4 19,4 L19,4 Z M19,20 L5,20 L5,9 L19,9 L19,20 L19,20 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Clock: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">

      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-312.000000, -120.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Clock"
            transform="translate(312.000000, 120.000000)"
          >
            <path
              d="M11.99,2 C17.52,2 22,6.48 22,12 C22,17.52 17.52,22 11.99,22 C6.47,22 2,17.52 2,12 C2,6.48 6.47,2 11.99,2 Z M12,4 C7.58,4 4,7.58 4,12 C4,16.42 7.58,20 12,20 C16.42,20 20,16.42 20,12 C20,7.58 16.42,4 12,4 Z M13,6 L13,11.5454977 L15.722145,14.2760479 L14.3056805,15.6880069 L11,12.3717784 L11,6 L13,6 Z"
              id="Combined-Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  AddCircle: () => (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
    >

      <g
        id="07.-Design-Guideline"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Guideline_Icons" transform="translate(-316.000000, -193.000000)">
          <g
            id="Icons-/-Basic-/-Line-/-Add-/-Cirle"
            transform="translate(316.000000, 193.000000)"
          >
            <path
              d="M13,7 L11,7 L11,11 L7,11 L7,13 L11,13 L11,17 L13,17 L13,13 L17,13 L17,11 L13,11 L13,7 L13,7 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 L12,20 Z"
              id="Shape"
              fill="#444545"
            ></path>
            <rect id="Rectangle" x="0" y="0" width="24" height="24"></rect>
          </g>
        </g>
      </g>
    </svg>
  ),
  Site: () => (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
    >

      <g
        id="07.-Design-Guideline"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Guideline_Icons"
          transform="translate(-1132.000000, -273.000000)"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Site"
            transform="translate(1132.000000, 273.000000)"
          >
            <path
              d="M11.99,2 C6.47,2 2,6.48 2,12 C2,17.52 6.47,22 11.99,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 11.99,2 L11.99,2 Z M18.92,8 L15.97,8 C15.65,6.75 15.19,5.55 14.59,4.44 C16.43,5.07 17.96,6.35 18.92,8 L18.92,8 Z M12,4.04 C12.83,5.24 13.48,6.57 13.91,8 L10.09,8 C10.52,6.57 11.17,5.24 12,4.04 L12,4.04 Z M4.26,14 C4.1,13.36 4,12.69 4,12 C4,11.31 4.1,10.64 4.26,10 L7.64,10 C7.56,10.66 7.5,11.32 7.5,12 C7.5,12.68 7.56,13.34 7.64,14 L4.26,14 L4.26,14 Z M5.08,16 L8.03,16 C8.35,17.25 8.81,18.45 9.41,19.56 C7.57,18.93 6.04,17.66 5.08,16 L5.08,16 Z M8.03,8 L5.08,8 C6.04,6.34 7.57,5.07 9.41,4.44 C8.81,5.55 8.35,6.75 8.03,8 L8.03,8 Z M12,19.96 C11.17,18.76 10.52,17.43 10.09,16 L13.91,16 C13.48,17.43 12.83,18.76 12,19.96 L12,19.96 Z M14.34,14 L9.66,14 C9.57,13.34 9.5,12.68 9.5,12 C9.5,11.32 9.57,10.65 9.66,10 L14.34,10 C14.43,10.65 14.5,11.32 14.5,12 C14.5,12.68 14.43,13.34 14.34,14 L14.34,14 Z M14.59,19.56 C15.19,18.45 15.65,17.25 15.97,16 L18.92,16 C17.96,17.65 16.43,18.93 14.59,19.56 L14.59,19.56 Z M16.36,14 C16.44,13.34 16.5,12.68 16.5,12 C16.5,11.32 16.44,10.66 16.36,10 L19.74,10 C19.9,10.64 20,11.31 20,12 C20,12.69 19.9,13.36 19.74,14 L16.36,14 L16.36,14 Z"
              id="Shape"
              fill="#444545"
            ></path>
            <rect id="Rectangle" x="0" y="0" width="24" height="24"></rect>
          </g>
        </g>
      </g>
    </svg>
  ),
  Message: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">

      <g
        id="02.-Icons🎈"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icons"
          transform="translate(-168.000000, -360.000000)"
          fill="currentColor"
        >
          <g
            id="Icons-/-Basic-/-Line-/-Message"
            transform="translate(168.000000, 360.000000)"
          >
            <path
              d="M20,2 L4,2 C2.9,2 2,2.9 2,4 L2,22 L6,18 L20,18 C21.1,18 22,17.1 22,16 L22,4 C22,2.9 21.1,2 20,2 L20,2 Z M20,16 L6,16 L4,18 L4,4 L20,4 L20,16 L20,16 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Clipboard: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">

      <g
        id="07.-Design-Guideline"
        stroke="none"
        strokeWidth="1"
        fill="none"
      >
        <g id="Guideline_Icons" transform="translate(-988.000000, -313.000000)">
          <g
            id="Icons-/-Basic-/-Line-/-Clipboard"
            transform="translate(988.000000, 313.000000)"
          >
            <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
            <path
              d="M19,2 L14.82,2 C14.4,0.84 13.3,0 12,0 C10.7,0 9.6,0.84 9.18,2 L5,2 C3.9,2 3,2.9 3,4 L3,20 C3,21.1 3.9,22 5,22 L19,22 C20.1,22 21,21.1 21,20 L21,4 C21,2.9 20.1,2 19,2 Z M12,2 C12.55,2 13,2.45 13,3 C13,3.55 12.55,4 12,4 C11.45,4 11,3.55 11,3 C11,2.45 11.45,2 12,2 Z M19,20 L5,20 L5,4 L7,4 L7,7 L17,7 L17,4 L19,4 L19,20 Z"
              id="Shape"
              fill="currentColor"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Send: () => (
    <svg width="1em" height="1em">

      <g id="02.-Icons🎈" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Icons" transform="translate(-120.000000, -456.000000)" fill="currentColor">
          <g id="Icons-/-Basic-/-Line-/-Send" transform="translate(120.000000, 456.000000)">
            <path d="M4.01,6.03 L11.52,9.25 L4,8.25 L4.01,6.03 M11.51,14.75 L4,17.97 L4,15.75 L11.51,14.75 M2.01,3 L2.00250508,8.24644381 C2.00107152,9.24993512 2.743486,10.0991315 3.7381756,10.2317567 L17,12 L17,12 L3.7381756,13.7682433 C2.743486,13.9008685 2.00107152,14.7500649 2.00250508,15.7535562 L2.01,21 L2.01,21 L23,12 L2.01,3 Z" id="Shape"></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Lock: () => (
    <svg width="1em" height="1em">
      <g id="02.-Icons🎈" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Icons" transform="translate(-264.000000, -312.000000)" fill="currentColor">
          <g id="Icons-/-Basic-/-Line-/-Lock-/-Locked" transform="translate(264.000000, 312.000000)">
            <path d="M12,17 C13.1,17 14,16.1 14,15 C14,13.9 13.1,13 12,13 C10.9,13 10,13.9 10,15 C10,16.1 10.9,17 12,17 L12,17 Z M18,8 L17,8 L17,6 C17,3.24 14.76,1 12,1 C9.24,1 7,3.24 7,6 L7,8 L6,8 C4.9,8 4,8.9 4,10 L4,20 C4,21.1 4.9,22 6,22 L18,22 C19.1,22 20,21.1 20,20 L20,10 C20,8.9 19.1,8 18,8 L18,8 Z M8.9,6 C8.9,4.29 10.29,2.9 12,2.9 C13.71,2.9 15.1,4.29 15.1,6 L15.1,8 L8.9,8 L8.9,6 L8.9,6 Z M18,20 L6,20 L6,10 L18,10 L18,20 L18,20 Z" id="Shape"></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Star: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g id="02.-Icons🎈" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Icons" transform="translate(-312.000000, -456.000000)" fill="currentColor">
          <g id="Icons-/-Basic-/-Line-/-Star" transform="translate(312.000000, 456.000000)">
            <path d="M12,7.13 L12.97,9.42 L13.44,10.53 L14.64,10.63 L17.11,10.84 L15.23,12.47 L14.32,13.26 L14.59,14.44 L15.15,16.85 L13.03,15.57 L12,14.93 L10.97,15.55 L8.85,16.83 L9.41,14.42 L9.68,13.24 L8.77,12.45 L6.89,10.82 L9.36,10.61 L10.56,10.51 L11.03,9.4 L12,7.13 M12,2 L9.19,8.63 L2,9.24 L7.46,13.97 L5.82,21 L12,17.27 L18.18,21 L16.54,13.97 L22,9.24 L14.81,8.63 L12,2 Z" id="Shape-Copy"></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Briefcase: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g id="02.-Icons🎈" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Icons" transform="translate(-72.000000, -72.000000)" fill="currentColor">
          <g id="Icons-/-Basic-/-Line-/-Briefcase" transform="translate(72.000000, 72.000000)">
            <path d="M15,3 C16.1045695,3 17,3.8954305 17,5 L17,7 L20,7 C21.1045695,7 22,7.8954305 22,9 L22,19 C22,20.1045695 21.1045695,21 20,21 L4,21 C2.8954305,21 2,20.1045695 2,19 L2,9 C2,7.8954305 2.8954305,7 4,7 L7,7 L7,5 C7,3.8954305 7.8954305,3 9,3 L15,3 Z M20,9 L4,9 L4,19 L20,19 L20,9 Z M15,5 L9,5 L9,7 L15,7 L15,5 Z" id="Combined-Shape"></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  EyeOpen: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g id="02.-Icons🎈" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Icons" transform="translate(-216.000000, -216.000000)" fill="currentColor">
          <g id="Icons-/-Basic-/-Line-/-Eye-/-Open" transform="translate(216.000000, 216.000000)">
            <path d="M12,5 C17,5 21.27,8.11 23,12.5 C21.27,16.89 17,20 12,20 C7,20 2.73,16.89 1,12.5 C2.73,8.11 7,5 12,5 Z M12,7 C8.22274649,7 4.8479073,9.15746073 3.207812,12.453019 L3.185,12.5 L3.207812,12.546981 C4.80585357,15.7580378 8.05081834,17.8886127 11.7102582,17.9957618 L12,18 C15.6723298,18 18.9642911,15.9607335 20.6515263,12.8189545 L20.814,12.5 L20.792188,12.453019 C19.1941464,9.24196222 15.9491817,7.11138727 12.2897418,7.00423816 L12,7 Z M12,8.5 C14.2133333,8.5 16,10.2866667 16,12.5 C16,14.7133333 14.2133333,16.5 12,16.5 C9.78666667,16.5 8,14.7133333 8,12.5 C8,10.2866667 9.78666667,8.5 12,8.5 Z M12,10.5 C10.8912362,10.5 10,11.3912362 10,12.5 C10,13.6087638 10.8912362,14.5 12,14.5 C13.1087638,14.5 14,13.6087638 14,12.5 C14,11.3912362 13.1087638,10.5 12,10.5 Z" id="Combined-Shape"></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Filter: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g id="07.-Design-Guideline" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Guideline_Icons" transform="translate(-892.000000, -313.000000)">
          <g id="Icons-/-Basic-/-Line-/-Filter" transform="translate(892.000000, 313.000000)">
            <path d="M6.9542226,5.95436137 L16.9542226,5.95436137 L11.9442226,12.2305265 L6.9542226,5.95436137 Z M4.2042226,6.05514192 C6.2242226,8.44591115 9.9542226,12.8766804 9.9542226,12.8766804 L9.9542226,18.4151419 C9.9542226,18.9228342 10.4042226,19.3382188 10.9542226,19.3382188 L12.9542226,19.3382188 C13.5042226,19.3382188 13.9542226,18.9228342 13.9542226,18.4151419 L13.9542226,12.8766804 C13.9542226,12.8766804 17.6742226,8.44591115 19.6942226,6.05514192 C20.2042226,5.44591115 19.77249,4 18.94249,4 L5.03248999,4 C4.20248999,4 3.6942226,5.44591115 4.2042226,6.05514192 Z" id="Shape" fill="currentColor"></path>
            <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
          </g>
        </g>
      </g>
    </svg>
  ),
  FolderNew: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g id="02.-Icons🎈" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Icons" transform="translate(-72.000000, -264.000000)" fill="currentColor">
          <g id="Icons-/-Basic-/-Line-/-Folder-/-New" transform="translate(72.000000, 264.000000)">
            <path d="M10,4 L12,6 L20,6 C21.1,6 22,6.9 22,8 L22,8 L22,18 C22,19.1 21.1,20 20,20 L20,20 L4,20 C2.9,20 2,19.1 2,18 L2,18 L2.01,6 C2.01,4.9 2.9,4 4,4 L4,4 L10,4 Z M20,8 L4,8 L4,18 L20,18 L20,8 Z M13,9 L13,12 L16,12 L16,14 L13,14 L13,17 L11,17 L11,14 L8,14 L8,12 L11,12 L11,9 L13,9 Z" id="Combined-Shape"></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  UserAdd: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g id="02.-Icons🎈" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Icons" transform="translate(-168.000000, -504.000000)" fill="currentColor">
          <g id="Icons-/-Basic-/-Line-/-User-/-Add" transform="translate(168.000000, 504.000000)">
            <path d="M15,12 C17.21,12 19,10.21 19,8 C19,5.79 17.21,4 15,4 C12.79,4 11,5.79 11,8 C11,10.21 12.79,12 15,12 Z M15,6 C16.1,6 17,6.9 17,8 C17,9.1 16.1,10 15,10 C13.9,10 13,9.1 13,8 C13,6.9 13.9,6 15,6 Z M15,14 C12.33,14 7,15.34 7,18 L7,20 L23,20 L23,18 C23,15.34 17.67,14 15,14 Z M9,18 C9.22,17.28 12.31,16 15,16 C17.7,16 20.8,17.29 21,18 L9,18 Z M6,15 L6,12 L9,12 L9,10 L6,10 L6,7 L4,7 L4,10 L1,10 L1,12 L4,12 L4,15 L6,15 Z" id="Shape"></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Error: () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24">
      <g id="07.-Design-Guideline" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Guideline_Icons" transform="translate(-652.000000, -233.000000)">
          <g id="Icons-/-Basic-/-Line-/-Error" transform="translate(652.000000, 233.000000)">
            <path d="M14.59,8 L12,10.59 L9.41,8 L8,9.41 L10.59,12 L8,14.59 L9.41,16 L12,13.41 L14.59,16 L16,14.59 L13.41,12 L16,9.41 L14.59,8 L14.59,8 Z M12,2 C6.47,2 2,6.47 2,12 C2,17.53 6.47,22 12,22 C17.53,22 22,17.53 22,12 C22,6.47 17.53,2 12,2 L12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 L12,20 Z" id="Shape" fill="currentColor"></path>
            <rect id="Rectangle" x="0" y="0" width="24" height="24"></rect>
          </g>
        </g>
      </g>
    </svg>
  ),
  FullscreenExist: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g id="02.-Icons🎈" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Icons" transform="translate(-120.000000, -264.000000)" fill="currentColor">
          <g id="Icons-/-Basic-/-Line-/-Fullscreen-/-Exist" transform="translate(120.000000, 264.000000)">
            <path d="M5,16 L8,16 L8,19 L10,19 L10,14 L5,14 L5,16 L5,16 Z M8,8 L5,8 L5,10 L10,10 L10,5 L8,5 L8,8 L8,8 Z M14,19 L16,19 L16,16 L19,16 L19,14 L14,14 L14,19 L14,19 Z M16,8 L16,5 L14,5 L14,10 L19,10 L19,8 L16,8 L16,8 Z" id="Shape"></path>
          </g>
        </g>
      </g>
    </svg>

  ),
  FullscreenExpand: () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g id="02.-Icons🎈" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Icons" transform="translate(-168.000000, -264.000000)" fill="currentColor">
          <g id="Icons-/-Basic-/-Line-/-Fullscreen-/-Expand" transform="translate(168.000000, 264.000000)">
            <path d="M7,14 L5,14 L5,19 L10,19 L10,17 L7,17 L7,14 L7,14 Z M5,10 L7,10 L7,7 L10,7 L10,5 L5,5 L5,10 L5,10 Z M17,17 L14,17 L14,19 L19,19 L19,14 L17,14 L17,17 L17,17 Z M14,5 L14,7 L17,7 L17,10 L19,10 L19,5 L14,5 L14,5 Z" id="Shape"></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Information: () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24">
      <title>15849A5F-6024-4116-AAE7-2EDC4F6ABCA4</title>
      <g id="07.-Design-Guideline" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Guideline_Icons" transform="translate(-1084.000000, -233.000000)">
          <g id="Icons-/-Basic-/-Line-/-Information" transform="translate(1084.000000, 233.000000)">
            <path d="M11,17 L13,17 L13,11 L11,11 L11,17 L11,17 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 L12,20 Z M11,9 L13,9 L13,7 L11,7 L11,9 L11,9 Z" id="Shape" fill="currentColor"></path>
            <rect id="Rectangle" x="0" y="0" width="24" height="24"></rect>
          </g>
        </g>
      </g>
    </svg>
  ),
  Error: () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24">
      <title>A921A9AB-48E5-43F4-91AF-18740F30984F</title>
      <g id="07.-Design-Guideline" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Guideline_Icons" transform="translate(-652.000000, -233.000000)">
          <g id="Icons-/-Basic-/-Line-/-Error" transform="translate(652.000000, 233.000000)">
            <path d="M14.59,8 L12,10.59 L9.41,8 L8,9.41 L10.59,12 L8,14.59 L9.41,16 L12,13.41 L14.59,16 L16,14.59 L13.41,12 L16,9.41 L14.59,8 L14.59,8 Z M12,2 C6.47,2 2,6.47 2,12 C2,17.53 6.47,22 12,22 C17.53,22 22,17.53 22,12 C22,6.47 17.53,2 12,2 L12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 L12,20 Z" id="Shape" fill="currentColor"></path>
            <rect id="Rectangle" x="0" y="0" width="24" height="24"></rect>
          </g>
        </g>
      </g>
    </svg>
  ),
  Location: () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24">
      <title>EF76C3FB-0007-4F99-8668-5D052EC25AC6</title>
      <g id="07.-Design-Guideline" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Guideline_Icons" transform="translate(-268.000000, -273.000000)">
          <g id="Icons-/-Basic-/-Line-/-Location-/-Default" transform="translate(268.000000, 273.000000)">
            <path d="M12,12 C10.9,12 10,11.1 10,10 C10,8.9 10.9,8 12,8 C13.1,8 14,8.9 14,10 C14,11.1 13.1,12 12,12 Z M18,10.2 C18,6.57 15.35,4 12,4 C8.65,4 6,6.57 6,10.2 C6,12.54 7.95,15.64 12,19.34 C16.05,15.64 18,12.54 18,10.2 Z M12,2 C16.2,2 20,5.22 20,10.2 C20,13.52 17.33,17.45 12,22 C6.67,17.45 4,13.52 4,10.2 C4,5.22 7.8,2 12,2 Z" id="Shape" fill="currentColor"></path>
            <rect id="Rectangle" x="0" y="0" width="24" height="24"></rect>
          </g>
        </g>
      </g>
    </svg>
  )
};
