package com.t4t.thought4thought.utils;

public class Thought4ThoughtResponseObject {
    private int status; // 0 is all good, -1 is something went wrong
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
