package com.t4t.thought4thought.utils;

public class Thought4ThoughtResponseObject {
    private int status; /* 0: success; 1: not successful; -1: unexpected error */
    private String info; // some details here

    public Thought4ThoughtResponseObject createResponse(int status, String info) {
        this.status = status;
        this.info = info;
        return this;
    }

    public int getStatus() { return status; }

    public String getInfo() { return info; }

    public void setStatus(int status) { this.status = status; }

    public void setInfo(String info) { this.info = info; }
}
