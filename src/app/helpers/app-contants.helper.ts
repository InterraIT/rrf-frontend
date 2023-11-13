export class AppConstants {
  static TOKEN_KEY = {
    ACCESS_TOKEN: "recruitmentAccessToken",
    REFRESH_TOKEN: "recruitmentRefreshToken",
    USER_INFO: "recruitmentUserInfo",
    LOGIN_COOKIE: "recruitmentLoggedIn"
  };
  static MAX_PAGE =10000;
  static API_RESPONSE = {
    SUCCESS: {
      CODE: "ER0000"
    }
  };

  static USER_TYPE = {
    RECRUITER_ADMIN: { ID: 0, NAME: "RecruiterAdmin" },
    INTERNAL_RECRUITER: { ID: 1, NAME: "InternalRecruiter" },
    EXTERNAL_RECRUITER: { ID: 2, NAME: "ExternalRecruiter" },
    INTERVIEWER: { ID: 3, NAME: "Interviewer" },
  };

  static STATES = {
    POSITION: {
      INIT: {
        ID: "R-000",
        NAME: "Initial"
      },
      DRAFT: {
        ID: "R-010",
        NAME: "Draft"
      },
      OPEN: {
        ID: "R-020",
        NAME: "Open"
      },
      OFFERED: {
        ID: "R-030",
        NAME: "Offered"
      },
      HIRED: {
        ID: "R-040",
        NAME: "Hired"
      },
      CLOSED: {
        ID: "R-050",
        NAME: "Closed"
      }
    },
    PROFILE: {
      INIT: {
        ID: "R-020-000",
        NAME: "Initial"
      },
      UPLOADED: {
        ID: "R-020-010",
        NAME: "Uploaded"
      },
      PROFILE_REJECTED: {
        ID: "R-020-020",
        NAME: "ProfileReject"
      },
      DUPLICATE: {
        ID: "R-020-030",
        NAME: "Duplicate"
      },
      IN_PROGRESS: {
        ID: "R-020-040",
        NAME: "InProgress"
      },
      REJECTED: {
        ID: "R-020-050",
        NAME: "Rejected"
      },
      SHORT_LISTED: {
        ID: "R-020-060",
        NAME: "Shortlisted"
      },
      BACKUP: {
        ID: "R-020-070",
        NAME: "Backup"
      },
      OFFERED: {
        ID: "R-020-080",
        NAME: "Offered"
      },
      ACCEPTED: {
        ID: "R-020-090",
        NAME: "Accepted"
      },
      WITHDRAWN: {
        ID: "R-020-100",
        NAME: "Withdrawn"
      },
      DECLINED: {
        ID: "R-020-110",
        NAME: "Declined"
      },
      JOINED: {
        ID: "R-020-120",
        NAME: "Joined"
      },
    },
    INTERVIEW: {
      ALL: {
        ID:"R-ALL",
        NAME:"All"
      },
      INIT: {
        ID: "R-020-040-00",
        NAME: "Initial"
      },
      SCHEDULED: {
        ID: "R-020-040-05",
        NAME: "Scheduled"
      },
      SELECTED: {
        ID: "R-020-040-10",
        NAME: "Selected"
      },
      REJECTED: {
        ID: "R-020-040-15",
        NAME: "Rejected"
      },
      ON_HOLD: {
        ID: "R-020-040-20",
        NAME: "OnHold"
      },
      CANCELLED: {
        ID: "R-020-040-25",
        NAME: "Cancelled"
      },
    }
  };

  public static DEBOUNCE_TIME = {
    SEARCH: 500,
    OTHE: 5
  };
}