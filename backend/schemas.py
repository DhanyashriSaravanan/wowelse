"""Pydantic schemas = input validation for request bodies."""
import re
from pydantic import BaseModel, EmailStr, field_validator, model_validator


class RegisterIn(BaseModel):
    username: str
    email: EmailStr
    password: str
    confirm_password: str

    @field_validator("username")
    @classmethod
    def check_username(cls, v):
        v = v.strip()
        if not re.fullmatch(r"[A-Za-z0-9_.]{3,30}", v):
            raise ValueError("Username must be 3-30 characters: letters, numbers, _ or .")
        return v

    @field_validator("password")
    @classmethod
    def check_password(cls, v):
        if len(v) < 8 or len(v) > 72:  # bcrypt only uses the first 72 bytes
            raise ValueError("Password must be 8-72 characters long")
        if not (re.search(r"[A-Za-z]", v) and re.search(r"\d", v)):
            raise ValueError("Password must contain at least one letter and one number")
        return v

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self


class LoginIn(BaseModel):
    identifier: str  # username or email
    password: str


class UserOut(BaseModel):
    id: str
    username: str
    email: str
    full_name: str
    auth_provider: str
    created_at: str
    picture: str | None = None


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
